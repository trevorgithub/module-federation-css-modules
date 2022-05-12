This demonstrates how to use CSS modules with module federation.  Note that a separate file is created for the CSS.
This sample code is a "container" or host for a button remote.  But this container itself is exposed, and could be federated with another host.  If that is done, you should see the styling - background colour of the div which wraps the remote button.

Most of the code generated with https://www.npmjs.com/package/create-mf-app

NOTE: There will be an error message  ("Failed to load button") when the app attempts to load the remote button, since it is not shared/running. This is expected and doesn't impact the purpose of this sample

Installation and running
=========================
1. Run **yarn** to install dependencies
2. Run **yarn build** to create the output files on disk.  (A production build is recommended, so the error boundary works to actually catch the error)
3. Run **yarn build:start** to serve the files
4. Navigate to http://localhost:3004 in your browser to see the results.  You can inspect the styles of the DIV element to see that the class name has the CSS module name mangling
