window.TopBarPlugin = () => {
  return {
    wrapComponents: {
      Topbar: (Original, system) => (props) => {
        const React = system.React;
        const originalTopbar = React.createElement(Original, props);
        const logoutLink = React.createElement(
          'a',
          {
            href: '/auth/logout',
            style: {
              color: 'black',
              fontWeight: 'bold',
              textDecoration: 'none',
              color: 'whiteSmoke',
              backgroundColor: '#1b1b1b',
              padding: '1.3rem',
            },
          },
          'Logout'
        );

        const spacer = React.createElement('div', {
          style: {
            flexGrow: '1',
            textAlign: 'center',
            color: 'whiteSmoke',
            margin: '0px',
            padding: '0.7rem',
          },
        });

        const header = React.createElement(
          'div',
          {
            style: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#1b1b1b',
              width: '100%',
              maxWidth: '1420px',
              margin: '0 auto',
            },
          },
          originalTopbar,
          spacer,
          logoutLink
        );

        return React.createElement(
          'div',
          {
            style: {
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#1b1b1b',
            },
          },
          header
        );
      },
    },
  };
};
