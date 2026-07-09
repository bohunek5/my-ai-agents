
import { PhotoProvider } from 'react-photo-view';

const PhotoProviderWrapper = ({ children }) => {
  return (
    <PhotoProvider
      speed={() => 800}
      easing={(type) => 
        type === 2 
          ? "cubic-bezier(0.1, 0.1, 0.25, 1)" 
          : "cubic-bezier(0.1, 0.1, 0.25, 1)"
      }
      maskOpacity={0.7}
      photoClosable={true}
      overlayRender={() => (
        <div style={{ backgroundColor: 'rgba(0,0,0,0.7)' }} />
      )}
    >
      {children}
    </PhotoProvider>
  );
};

export default PhotoProviderWrapper;