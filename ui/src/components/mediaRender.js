import React, { useEffect, useState } from 'react';

const MediaRenderer = ({ item,file }) => {

  if (!item || !file) {
    return <p>❌ Invalid media data.</p>;
  }
  const fileUrl = `https://ipfs.io/ipfs/${file.replace("ipfs://", "")}`;
  const category = Number((item.category).toString())
  if (category == 1 || category == 2) {
    return <img src={fileUrl} style={{ maxWidth: '100%', borderRadius: '10px' }} />;
  } else if (category == 3) {
    return (
      <>
        <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGkzbzR1dG5ldm95ZTluNDZ3OHpxNWlmcG9uOWF1MW55MHl2ZHFkeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/UUcRUn7c9mKCULj9Eq/giphy.gif" alt="" style={{ maxWidth: '100%', borderRadius: '10px', height: '79%', objectFit: 'cover', }} />
        <audio controls style={{
          width: '100%',
          backgroundColor: 'var(--gray)',
          borderRadius: '8px', // Optional: if you want rounded corners
          border: 'none', // Removes any default border
        }}>
          <source src={fileUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </>
    );
  } else if (category == 4) {
    return (
      <video width="100%" controls style={{ borderRadius: '10px', height: '100%', objectFit: 'cover' }}>
        <source src={fileUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  } else {
    return <p>📁 Unsupported or unknown file type.</p>;
  }
}
export default MediaRenderer;
