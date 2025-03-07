import PropTypes from 'prop-types'
import hljs from 'highlight.js';

function RightSide({ fileTree, setFileTree, currentFile, setCurrentFile, openFiles, setOpenFiles }) {

    return (
        <>
            <section className="right bg-red-50 flex-grow h-full flex">
                <div className="explorer h-full max-w-64 min-w-52 bg-slate-200">
                    <div className="file-tree w-full">
                        {
                            Object.keys(fileTree).map((file, index) => (
                                <button key={index} onClick={() => {
                                    setCurrentFile(file)
                                    setOpenFiles([new Set([...openFiles, file])])
                                }}
                                    className="tree-element cursor-pointer p-2 px-4 flex items-center gap-2 bg-slate-300 w-full" >

                                    <p className='font-semibold text-lg' >{file}</p>
                                </button>
                            ))
                        }
                    </div>
                </div>
                {currentFile && (
                    <div className="code-editor flex flex-col flex-grow h-full shrink">
                        <div className="top flex">
                            {
                                openFiles.map((file, index) => (
                                    <button key={index} onClick={() => setCurrentFile(file)}
                                        className={`open-file cursor-pointer p-2 px-4 flex items-center w-fit gap-2 bg-slate-300 ${currentFile === file ? 'bg-slate-400' : ''}`} >
                                        <p className='font-semibold text-lg' >{file}</p>
                                    </button>
                                ))
                            }
                        </div>
                        <div className="bottom flex flex-grow max-w-full shrink overflow-auto">
                            {
                                fileTree[currentFile] && (
                                    <div className="code-editor-area h-full overflow-auto flex-grow bg-slate-50">
                                        <pre className="hljs h-full">
                                            <code
                                                className="hljs h-full outline-none"
                                                contentEditable
                                                suppressContentEditableWarning
                                                onBlur={(e) => {
                                                    const updatedContent = e.target.innerText;
                                                    setFileTree(prevFileTree => (
                                                        {
                                                            ...prevFileTree,
                                                            [currentFile]: {
                                                                ...prevFileTree[currentFile],
                                                                content: updatedContent
                                                            }
                                                        }
                                                    ));

                                                }}
                                                dangerouslySetInnerHTML={{ __html: hljs.highlight('javascript', fileTree[currentFile].content).value }}
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
}


export default RightSide
