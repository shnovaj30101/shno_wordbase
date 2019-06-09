<h1>shno_wordbase</h1>
<ul>
<li>With shno_wordbase, it's easy for building personal word question bank.</li>
<li>This project was only tested on Ubuntu 16.04</li>
</ul>
<h2>Installation</h2>
<ul>
<li>MongoDB Installation</li>
</ul>
<blockquote>
<p>https://docs.mongodb.com/manual/installation/</p>
</blockquote>
<ul>
<li>Project build</li>
</ul>
<pre><code>$ git clone https://github.com/shnovaj30101/shno_wordbase.git
$ cd shno_wordbase
$ npm install
</code></pre>
<h2>Usage</h2>
<ul>
<li>Configuration</li>
</ul>
<pre><code>//Config file path: shno_wordbase/config.js

config_options = {
    'port': 3000, // the shno_wordbase service port
    'mongodb_port': 9113 // the MongoDB api port 
}
</code></pre>
<ul>
<li>Start the process</li>
</ul>
<pre><code>$ cd shno_wordbase/display
$ node app.js
</code></pre>
<h2>GUI Interface</h2>
<h4>Search Interface</h4>
<blockquote>
<p>With the search interface, you can search the questions you built by assigning the query word or the date range. Then you can edit or delete a question on the search interface.</p>
</blockquote>
<ul>
<li>URL: http://localhost:3000/search/</li>
</ul>
<h4>Problem Interface</h4>
<blockquote>
<p>You can review the vocabulary by answering questions displayed randomly on the problem interface. This interface would also display the frequency of getting the answer right or not.</p>
</blockquote>
<ul>
<li>URL: http://localhost:3000/problem/</li>
</ul>
<h4>Addition Interface</h4>
<blockquote>
<p>You can add new word questions on the Interface.</p>
</blockquote>
<ul>
<li>URL: http://localhost:3000/addition/</li>
</ul>
