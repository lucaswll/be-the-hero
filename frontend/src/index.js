//é o primeiro arquivo lido pelo index.html (independente de qqer coisa, ele sempre ira olhar pra este)

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';

ReactDOM.render(<App />, document.getElementById('root')); //busca pela id = root
//quando encontrar essa id la no index.html, ira mostrar o que consta no arquivo App.js
