import '../styles/globals.css';
import ProgressBar from '@badrap/bar-of-progress';
import Router from 'next/router';
// import 'swiper/css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import WishlistProvider from '../context/wishlist-context';
import { Toaster } from 'react-hot-toast';
import ModalProvider from '../context/modal-context';
import { SessionProvider } from 'next-auth/react';

const progress = new ProgressBar({
  // The size (height) of the progress bar.
  // Numeric values get converted to px.
  size: 4,

  // Color of the progress bar.
  // Also used for the glow around the bar.
  color: '#ff385c',

  // Class name used for the progress bar element.
  className: 'z-50',

  // How many milliseconds to wait before the progress bar
  // animation starts after calling .start().
  delay: 100,
});

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ModalProvider>
        <WishlistProvider>
          {/* Toaster */}
          <>
            <Toaster position="bottom-left" />
          </>
          <Component {...pageProps} />
        </WishlistProvider>
      </ModalProvider>
    </SessionProvider>
  );
}

export default MyApp;

// linear-gradient(to right, #E61E4D 0%, #E31C5F 50%, #D70466 100%)


// #ff385c
