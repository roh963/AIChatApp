import PropTypes from 'prop-types'
import hljs from 'highlight.js'

function RightSide({ fileTree, setFileTree, currentFile, setCurrentFile, openFiles, setOpenFiles, webContainer, iframeUrl, setIframeUrl, runProcess, setRunProcess, saveFileTree }) {

    return (
        <>
            {/* <section className="right bg-zinc-500 font-bold flex-grow h-full flex">

                <div className="explorer h-full max-w-64 min-w-52 bg-gray-600">
                    <div className="file-tree w-full">
                        {
                            Object.keys(fileTree).map((file, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setCurrentFile(file)
                                        setOpenFiles([...new Set([...openFiles, file])])
                                    }}
                                    className="tree-element cursor-pointer p-2 px-4 flex items-center gap-2 bg-slate-500 text-blue-50 font-thin w-full">
                                    <p
                                        className='font-semibold text-lg'
                                    >{file}</p>
                                </button>))

                        }
                    </div>

                </div>


                <div className="code-editor flex flex-col flex-grow h-full shrink">

                    <div className="top flex justify-between w-full">

                        <div className="files flex">
                            {
                                openFiles.map((file, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentFile(file)}
                                        className={`open-file cursor-pointer p-2 px-4 flex items-center w-fit gap-2 bg-gray-300 ${currentFile === file ? 'bg-black' : ''}`}>
                                        <p
                                            className='font-semibold text-lg'
                                        >{file}</p>
                                    </button>
                                ))
                            }
                        </div>

                        <div className="actions flex gap-2">
                            <button
                                onClick={async () => {
                                    await webContainer.mount(fileTree)
                                    const installProcess = await webContainer.spawn("npm", ["install"])
                                    installProcess.output.pipeTo(new WritableStream({
                                        write(chunk) {
                                            console.log(chunk)
                                        }
                                    }))

                                    // const runProcess = await webContainer.spawn("npm", ["start"])
                                    if(runProcess){
                                        runProcess.kill()
                                    }
                                    let tempRunProcess = await webContainer.spawn("npm", [ "start" ]);
                                    tempRunProcess.output.pipeTo(new WritableStream({
                                        write(chunk) {
                                            console.log(chunk)
                                        }
                                    }))
                                    setRunProcess(tempRunProcess)
                                    webContainer.on('server-ready', (port, url) => {
                                        console.log(port, url)
                                        setIframeUrl(url)
                                    })

                                }}
                                className='p-2 px-4 bg-slate-300 text-white'
                            >
                                run
                            </button>


                        </div>
                    </div>
                    <div className="bottom flex flex-grow max-w-full shrink overflow-auto">
                        {
                            fileTree[currentFile] && (
                                <div className="code-editor-area h-full overflow-auto flex-grow bg-slate-50">
                                    <pre
                                        className="hljs h-full">
                                        <code
                                            className="hljs h-full outline-none"
                                            contentEditable
                                            suppressContentEditableWarning
                                            onBlur={(e) => {
                                                const updatedContent = e.target.innerText;
                                                const ft = {
                                                    ...fileTree,
                                                    [currentFile]: {
                                                         file: {
                                                             contents: updatedContent
                                                         }
                                                        
                                                    }
                                                }
                                                setFileTree(ft)
                                                saveFileTree(ft)
                                            }}
                                            dangerouslySetInnerHTML={{ __html: hljs.highlight('javascript', fileTree[currentFile].file.contents).value }}
                                            style={{
                                                whiteSpace: 'pre-wrap',
                                                paddingBottom: '25rem',
                                                counterSet: 'line-numbering',
                                            }}
                                        />
                                    </pre>
                                </div>
                            )
                        }
                    </div>
                </div>
                {iframeUrl && webContainer &&
                    (<div className="flex min-w-96 flex-col h-full">
                        <div className="address-bar">
                            <input type="text"
                                onChange={(e) => setIframeUrl(e.target.value)}
                                value={iframeUrl} className="w-full p-2 px-4 bg-slate-200" />
                        </div>
                        <iframe src={iframeUrl} className="w-full h-full"></iframe>
                    </div>)
                }
            </section> */}
            <section className="right bg-gray-500 text-white font-bold flex-grow h-full flex">

                <div className="explorer h-full max-w-xs min-w-52 bg-gray-700 shadow-lg">
                    <div className="file-tree w-full">
                        {
                            Object.keys(fileTree).map((file, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setCurrentFile(file)
                                        setOpenFiles([...new Set([...openFiles, file])])
                                    }}
                                    className="tree-element cursor-pointer p-3 flex items-center gap-3 hover:bg-gray-600 transition duration-200 ease-in-out">
                                    <p className='font-semibold text-lg truncate'>{file}</p>
                                </button>
                            ))
                        }
                    </div>
                </div>

                <div className="code-editor flex flex-col flex-grow h-full">

                    <div className="top flex justify-between items-center w-full p-3 bg-gray-900 shadow">
                        <div className="files flex space-x-2 overflow-auto">
                            {
                                openFiles.map((file, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentFile(file)}
                                        className={`open-file cursor-pointer p-2 px-4 flex items-center transition duration-200 ease-in-out ${currentFile === file ? 'bg-gray-600' : 'bg-gray-500 hover:bg-gray-400'}`}>
                                        <p className='font-semibold text-lg truncate'>{file}</p>
                                    </button>
                                ))
                            }
                        </div>

                        <div className="actions flex gap-2">
                        
                            <button
                                onClick={async () => {
                                    await webContainer.mount(fileTree)
                                    const installProcess = await webContainer.spawn("npm", ["install"])
                                    installProcess.output.pipeTo(new WritableStream({
                                        write(chunk) {
                                            console.log(chunk)
                                        }
                                    }))

                                    if (runProcess) {
                                        runProcess.kill()
                                    }
                                    let tempRunProcess = await webContainer.spawn("npm", ["start"]);
                                    tempRunProcess.output.pipeTo(new WritableStream({
                                        write(chunk) {
                                            console.log(chunk)
                                        }
                                    }));
                                    setRunProcess(tempRunProcess);
                                    webContainer.on('server-ready', (port, url) => {
                                        console.log(port, url);
                                        setIframeUrl(url);
                                    });
                                }}
                                className='p-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200'>
                                Run
                            </button>
                        </div>
                    </div>

                    <div className="bottom flex flex-grow overflow-auto bg-gray-800">
                        {
                            fileTree[currentFile] && (
                                <div className="code-editor-area h-full overflow-auto flex-grow bg-gray-900 p-3">
                                    <pre className="hljs h-full">
                                        <code
                                            className="hljs h-full outline-none"
                                            contentEditable
                                            suppressContentEditableWarning
                                            onBlur={(e) => {
                                                const updatedContent = e.target.innerText;
                                                const ft = {
                                                    ...fileTree,
                                                    [currentFile]: {
                                                        file: {
                                                            contents: updatedContent
                                                        }
                                                    }
                                                }
                                                setFileTree(ft)
                                                saveFileTree(ft)
                                            }}
                                             dangerouslySetInnerHTML={{ __html: hljs.highlight(fileTree[currentFile].file.contents, { language: 'javascript' }).value }}
                                            style={{
                                                whiteSpace: 'pre-wrap',
                                                paddingBottom: '25rem',
                                                counterSet: 'line-numbering',
                                            }}
                                        />
                                    </pre>
                                </div>
                            )
                        }
                    </div>
                </div>

                {iframeUrl && webContainer && (
                    <div className="flex min-w-96 flex-col h-full">
                        <div className="address-bar">
                            <input type="text"
                                onChange={(e) => setIframeUrl(e.target.value)}
                                value={iframeUrl}
                                className="w-full p-2 px-4 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" />
                        </div>
                        <iframe src={iframeUrl} className="w-full h-full  text-white border-none rounded-md"></iframe>
                    </div>
                )}
            </section>

        </>
    )
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
}


export default RightSide
