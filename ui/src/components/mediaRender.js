import React, { useEffect, useState } from 'react';

const MediaRenderer = ({ ipfsUrl }) => {
  const [mediaType, setMediaType] = useState(null);
  const [fileUrl, setFileUrl] = useState('');

  useEffect(() => {
    const httpUrl = `https://ipfs.io/ipfs/${ipfsUrl.replace("ipfs://", "")}`;
    setFileUrl(httpUrl);

    const fetchContentType = async () => {
      try {
        const response = await fetch(httpUrl, { method: 'HEAD' });
        const contentType = response.headers.get('content-type');

        if (contentType.includes('image')) {
          setMediaType('image');
        } else if (contentType.includes('video')) {
          setMediaType('video');
        } else if (contentType.includes('audio')) {
          setMediaType('audio');
        } else {
          setMediaType('unknown');
        }
      } catch (err) {
        console.error('Error detecting content type:', err);
        setMediaType('error');
      }
    };

    fetchContentType();
  }, [ipfsUrl]);

  if (!mediaType) {
    return <p>⏳ Loading media...</p>;
  }

  if (mediaType === 'image') {
    return <img src={fileUrl} alt="media" style={{ maxWidth: '100%', borderRadius: '10px' }} />;
  } else if (mediaType === 'video') {
    return (
      <video width="100%" controls style={{ borderRadius: '10px' }}>
        <source src={fileUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  } else if (mediaType === 'audio') {
    return (
      <audio controls style={{ width: '100%' }}>
        <source src={fileUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    );
  } else if (mediaType === 'unknown') {
    return <p>📁 Unsupported or unknown file type.</p>;
  } else if (mediaType === 'error') {
    return <p>❌ Error loading media.</p>;
  }
};

export default MediaRenderer;
