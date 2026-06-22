import React, { useState, useEffect } from 'react';
import { FilesIcon, SearchIcon, FolderIcon, FileIcon, ChevronDownIcon } from './icons';
import { FileData, GenerationStatus } from './Editor';

interface FileExplorerProps {
    files: FileData[];
    status: GenerationStatus;
    activeFilePath: string | null;
    onFileSelect: (path: string) => void;
}

interface FileNode {
    name: string;
    path: string;
    content?: string;
    children?: { [key: string]: FileNode };
}

interface Tree {
    [key: string]: FileNode;
}

const buildFileTree = (files: FileData[]): Tree => {
    const tree: Tree = {};
    if (!files) return tree;

    files.forEach(file => {
        const parts = file.path.split('/');
        let currentLevel: Tree | undefined = tree;
        parts.forEach((part, index) => {
            if (!currentLevel) return;

            if (!currentLevel[part]) {
                const isDirectory = index < parts.length - 1;
                const newPath = parts.slice(0, index + 1).join('/');
                currentLevel[part] = {
                    name: part,
                    path: newPath,
                };
                if (isDirectory) {
                    currentLevel[part].children = {};
                } else {
                    currentLevel[part].content = file.content;
                }
            }
            currentLevel = currentLevel[part].children;
        });
    });
    return tree;
};

const TreeNode: React.FC<{ node: FileNode; level: number; activeFilePath: string | null; onFileSelect: (path: string) => void; expandedFolders: Set<string>; toggleFolder: (path: string) => void; }> = 
({ node, level, activeFilePath, onFileSelect, expandedFolders, toggleFolder }) => {
    const isDirectory = !!node.children;
    const isExpanded = expandedFolders.has(node.path);

    const handleNodeClick = () => {
        if (isDirectory) {
            toggleFolder(node.path);
        } else {
            onFileSelect(node.path);
        }
    };

    const isActive = activeFilePath === node.path;
    const indentStyle = { paddingLeft: `${level * 1 + 0.5}rem` };

    return (
        <div>
            <div
                onClick={handleNodeClick}
                className={`flex items-center space-x-2 py-1.5 cursor-pointer text-sm rounded transition-colors ${isActive ? 'bg-[#37373c] text-white' : 'text-gray-400 hover:bg-[#2a2a2e] hover:text-white'}`}
                style={indentStyle}
            >
                {isDirectory ? (
                    <>
                        <ChevronDownIcon className={`w-4 h-4 flex-shrink-0 transition-transform ${isExpanded ? 'rotate-0' : '-rotate-90'}`} />
                        <FolderIcon className="w-4 h-4 flex-shrink-0" isOpen={isExpanded} />
                    </>
                ) : (
                    <FileIcon className="w-4 h-4 flex-shrink-0 ml-4" />
                )}
                <span>{node.name}</span>
            </div>
            {isDirectory && isExpanded && (
                <div>
                    {Object.values(node.children || {}).sort((a,b) => {
                        const aIsDir = !!a.children;
                        const bIsDir = !!b.children;
                        if (aIsDir !== bIsDir) return aIsDir ? -1 : 1;
                        return a.name.localeCompare(b.name);
                    }).map(childNode => (
                        <TreeNode key={childNode.path} node={childNode} level={level + 1} activeFilePath={activeFilePath} onFileSelect={onFileSelect} expandedFolders={expandedFolders} toggleFolder={toggleFolder} />
                    ))}
                </div>
            )}
        </div>
    );
};


const FileExplorer: React.FC<FileExplorerProps> = ({ files, status, activeFilePath, onFileSelect }) => {
    const fileTree = buildFileTree(files);
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

    useEffect(() => {
        const defaultExpanded = new Set<string>();
        Object.values(fileTree).forEach(node => {
            if (node.children) {
                defaultExpanded.add(node.path);
            }
        });
        setExpandedFolders(defaultExpanded);

        if(files.length > 0 && !activeFilePath) {
            const entrypoint = files.find(f => f.path.includes('App.tsx')) || files.find(f => f.path.includes('.js')) || files[0];
            onFileSelect(entrypoint.path)
        }

    }, [files]);

    const toggleFolder = (path: string) => {
        setExpandedFolders(prev => {
            const newSet = new Set(prev);
            if (newSet.has(path)) {
                newSet.delete(path);
            } else {
                newSet.add(path);
            }
            return newSet;
        });
    };
    
    return (
        <aside className="w-64 bg-[#1c1c1f] text-gray-300 flex flex-col shrink-0 border-r border-gray-700">
            <div className="flex items-center justify-between h-10 px-3 border-b border-gray-700 flex-shrink-0">
                <h2 className="text-sm font-medium">Files</h2>
                <button className="text-gray-400 hover:text-white">
                    <SearchIcon className="w-4 h-4" />
                </button>
            </div>
            <div className="flex-1 p-2 overflow-y-auto">
                {status === 'building' && <div className="p-3 text-sm text-gray-400">Generating files...</div>}
                {status !== 'building' && files.length > 0 && (
                     Object.values(fileTree).sort((a,b) => {
                        const aIsDir = !!a.children;
                        const bIsDir = !!b.children;
                        if (aIsDir !== bIsDir) return aIsDir ? -1 : 1;
                        return a.name.localeCompare(b.name);
                    }).map(node => (
                        <TreeNode key={node.path} node={node} level={0} activeFilePath={activeFilePath} onFileSelect={onFileSelect} expandedFolders={expandedFolders} toggleFolder={toggleFolder}/>
                    ))
                )}
            </div>
        </aside>
    );
};

export default FileExplorer;