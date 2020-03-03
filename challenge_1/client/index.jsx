// Build a single-page app that enables users to search and browse historical event information based on data found in the JSON file included with this repo.


// Use the full-text search features of json-server to return a result to the UI for browsing.
// Paginate the list of events using react-paginate, loading no more than ten at a time.
// Ensure you are implementing server-side pagination  NOT client-side pagination.

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

ReactDOM.render(<App />, document.getElementById('app'));