(function () {
    'use strict';
    console.log("loaded extension - GChat ThreadLink");
    var threads = document.querySelectorAll('c-wiz[data-topic-id]');
    for (var i = 0; i < threads.length; i++) {
        var thread = threads[i];
        var threadId = thread.dataset.topicId;
        var threadLink = document.URL + "/" + threadId;
        var follow = thread.querySelector('div[aria-label=Follow]');
        if (!follow) { continue }
        var threadLinkButtonId = 'permalink-' + threadId;
        if (!document.getElementById(threadLinkButtonId)) {
            var a = document.createElement('a');
            a.href = threadLink;
            a.title = "Permalink";
            a.innerText = "#";
            a.style = "padding: 0 0.3em 0 0.5em;font-weight: bold;";
            a.addEventListener('click', copyLinkToClipboard)
            var followWrapper = follow.parentNode.parentNode;
            followWrapper.appendChild(a);
        }
    }
})();

function copyLinkToClipboard(event) {
    event.preventDefault();
    navigator.clipboard.writeText(event.target.href)
        .catch(function (err) {
            console.log("error occurred while copying to clipboard: ", err)
        });
}