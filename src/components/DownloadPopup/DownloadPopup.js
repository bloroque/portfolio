import React, { useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import './DownloadPopup.css';

const DownloadPopup = ({ children }) => {
    const [downloads, setDownloads] = useState([]);

    const startDownload = useCallback((url, filename) => {
        const id = Date.now();
        setDownloads(prev => [...prev, { id, filename, progress: 0, status: 'downloading' }]);

        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';

        xhr.onprogress = (e) => {
            if (e.lengthComputable) {
                const progress = Math.round((e.loaded / e.total) * 100);
                setDownloads(prev => prev.map(d => d.id === id ? { ...d, progress } : d));
            } else {
                setDownloads(prev => prev.map(d => {
                    if (d.id === id && d.progress < 90) {
                        return { ...d, progress: d.progress + 15 };
                    }
                    return d;
                }));
            }
        };

        xhr.onload = () => {
            if (xhr.status === 200) {
                const blob = xhr.response;
                const blobUrl = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = blobUrl;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(blobUrl);

                setDownloads(prev => prev.map(d => d.id === id ? { ...d, progress: 100, status: 'done' } : d));
                setTimeout(() => {
                    setDownloads(prev => prev.filter(d => d.id !== id));
                }, 2000);
            } else {
                setDownloads(prev => prev.map(d => d.id === id ? { ...d, status: 'error' } : d));
                setTimeout(() => {
                    setDownloads(prev => prev.filter(d => d.id !== id));
                }, 3000);
            }
        };

        xhr.onerror = () => {
            setDownloads(prev => prev.map(d => d.id === id ? { ...d, status: 'error' } : d));
            setTimeout(() => {
                setDownloads(prev => prev.filter(d => d.id !== id));
            }, 3000);
        };

        xhr.send();
    }, []);

    return (
        <>
            {children(startDownload)}

            {/* Portal: renders popup at body level to escape transform contexts */}
            {downloads.length > 0 && createPortal(
                <div className="download-popup-container">
                    {downloads.map((dl) => (
                        <div
                            key={dl.id}
                            className={`download-popup ${dl.status === 'done' ? 'download-popup-done' : ''} ${dl.status === 'error' ? 'download-popup-error' : ''}`}
                        >
                            {/* Icon */}
                            <div className="download-popup-icon">
                                {dl.status === 'downloading' && (
                                    <svg className="download-spinner" viewBox="0 0 24 24" width="20" height="20">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" fill="none" opacity="0.2" />
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" fill="none"
                                            strokeDasharray={`${dl.progress * 0.628} 62.8`}
                                            strokeLinecap="round"
                                            className="download-spinner-progress"
                                        />
                                    </svg>
                                )}
                                {dl.status === 'done' && (
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                )}
                                {dl.status === 'error' && (
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                )}
                            </div>

                            {/* Info */}
                            <div className="download-popup-info">
                                <span className="download-popup-filename">{dl.filename}</span>
                                <span className="download-popup-status">
                                    {dl.status === 'downloading' && `${dl.progress}%`}
                                    {dl.status === 'done' && 'Terminé'}
                                    {dl.status === 'error' && 'Erreur'}
                                </span>
                            </div>

                            {/* Progress bar */}
                            {dl.status === 'downloading' && (
                                <div className="download-popup-bar">
                                    <div
                                        className="download-popup-bar-fill"
                                        style={{ width: `${dl.progress}%` }}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>,
                document.body
            )}
        </>
    );
};

export default DownloadPopup;
