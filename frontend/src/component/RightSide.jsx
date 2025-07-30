import PropTypes from 'prop-types';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css'; // Add your preferred theme

function RightSide({
    fileTree,
    setFileTree,
    currentFile,
    setCurrentFile,
    openFiles,
    setOpenFiles,
    webContainer,
    iframeUrl,
    setIframeUrl,
    runProcess,
    setRunProcess,
    saveFileTree
}) {

    return (
        <section className="right bg-gradient-to-b from-gray-900 to-gray-800 text-white font-bold flex-grow h-screen flex rounded-l-3xl shadow-2xl border-l-4 border-blue-700">

            {/* File Explorer */}
            <div className="explorer h-full max-w-xs min-w-52 bg-gradient-to-b from-gray-800 to-gray-900 shadow-xl rounded-l-3xl border-r-2 border-blue-700 p-2">
                <div className="file-tree w-full">
                    {Object.keys(fileTree).map((file, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setCurrentFile(file);
                                setOpenFiles([...new Set([...openFiles, file])]);
                            }}
                            className="tree-element cursor-pointer p-3 flex items-center gap-3 rounded-xl hover:bg-blue-700 transition duration-200 ease-in-out border border-transparent hover:border-blue-400 mb-2 shadow-md"
                        >
                            <p className="font-semibold text-lg truncate">{file}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Editor Area */}
            <div className="code-editor flex flex-col flex-grow h-full">
                {/* Tabs & Actions */}
                <div className="top flex justify-between items-center w-full p-4 bg-gradient-to-r from-blue-900 to-blue-700 shadow-lg rounded-tr-3xl">
                    <div className="files flex space-x-2 overflow-auto">
                        {openFiles.map((file, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentFile(file)}
                                className={`open-file cursor-pointer p-2 px-4 flex items-center transition duration-200 ease-in-out rounded-xl ${
                                    currentFile === file
                                        ? 'bg-blue-600 border-2 border-blue-300'
                                        : 'bg-gray-700 hover:bg-gray-600 border border-gray-600'
                                }`}
                            >
                                <p className="font-semibold text-lg truncate">{file}</p>
                            </button>
                        ))}
                    </div>

                    <div className="actions flex gap-2">
                        <button
                            onClick={async () => {
                                await webContainer.mount(fileTree);
                                const installProcess = await webContainer.spawn('npm', ['install']);
                                installProcess.output.pipeTo(
                                    new WritableStream({
                                        write(chunk) {
                                            console.log(chunk);
                                        }
                                    })
                                );
                                if (runProcess) runProcess.kill();

                                const newRunProcess = await webContainer.spawn('npm', ['start']);
                                newRunProcess.output.pipeTo(
                                    new WritableStream({
                                        write(chunk) {
                                            console.log(chunk);
                                        }
                                    })
                                );
                                setRunProcess(newRunProcess);

                                webContainer.on('server-ready', (port, url) => {
                                    console.log(port, url);
                                    setIframeUrl(url);
                                });
                            }}
                            className="p-3 px-6 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-xl shadow-lg hover:bg-blue-800 transition duration-200 border-2 border-blue-300 font-bold"
                        >
                            Run
                        </button>
                    </div>
                </div>

                {/* Code Editor */}
                <div className="bottom flex flex-grow overflow-auto bg-gradient-to-b from-gray-900 to-gray-800 rounded-b-3xl p-4">
                    {fileTree[currentFile] && (
                        <div className="code-editor-area h-full overflow-auto flex-grow bg-gray-900 p-4 rounded-2xl shadow-inner border border-blue-900">
                            <pre className="hljs h-full">
                                <code
                                    className="hljs h-full outline-none"
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={(e) => {
                                        const updatedContent = e.target.innerText;
                                        const updatedTree = {
                                            ...fileTree,
                                            [currentFile]: {
                                                file: {
                                                    contents: updatedContent
                                                }
                                            }
                                        };
                                        setFileTree(updatedTree);
                                        saveFileTree(updatedTree);
                                    }}
                                    dangerouslySetInnerHTML={{
                                        __html: hljs.highlight(
                                            fileTree[currentFile].file.contents,
                                            { language: 'javascript' }
                                        ).value
                                    }}
                                    style={{
                                        whiteSpace: 'pre-wrap',
                                        paddingBottom: '25rem'
                                    }}
                                />
                            </pre>
                        </div>
                    )}
                </div>
            </div>

            {/* Live Preview */}
            {iframeUrl && webContainer && (
                <div className="flex min-w-96 flex-col h-full rounded-r-3xl shadow-2xl border-l-4 border-blue-700 bg-gradient-to-b from-gray-900 to-gray-800">
                    <div className="address-bar p-2 bg-gradient-to-r from-blue-900 to-blue-700 rounded-t-2xl">
                        <input
                            type="text"
                            onChange={(e) => setIframeUrl(e.target.value)}
                            value={iframeUrl}
                            className="w-full p-2 px-4 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 border border-blue-400"
                        />
                    </div>
                    <iframe
                        src={iframeUrl}
                        className="w-full h-full text-white border-none rounded-b-2xl shadow-inner"
                    ></iframe>
                </div>
            )}
        </section>
    );
}

RightSide.propTypes = {
    fileTree: PropTypes.object.isRequired,
    setFileTree: PropTypes.func.isRequired,
    currentFile: PropTypes.string,
    setCurrentFile: PropTypes.func.isRequired,
    openFiles: PropTypes.array.isRequired,
    setOpenFiles: PropTypes.func.isRequired,
    webContainer: PropTypes.object.isRequired,
    iframeUrl: PropTypes.string,
    setIframeUrl: PropTypes.func.isRequired,
    runProcess: PropTypes.object,
    setRunProcess: PropTypes.func.isRequired,
    saveFileTree: PropTypes.func.isRequired
};

export default RightSide;
