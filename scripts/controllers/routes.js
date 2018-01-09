
function parseURL(url) {
    var parser = document.createElement('a'),
        searchObject = {},
        queries, split, i;
    // Let the browser do the work
    parser.href = url;
    // Convert query string to object
    queries = parser.search.replace(/^\?/, '').split('&');
    for (i = 0; i < queries.length; i++) {
        split = queries[i].split('=');
        searchObject[split[0]] = split[1];
    }
    return {
        protocol: parser.protocol,
        host: parser.host,
        hostname: parser.hostname,
        port: parser.port,
        pathname: parser.pathname,
        search: parser.search,
        searchObject: searchObject,
        hash: parser.hash
    };
}

if(window.location.pathname !== '/') {
    page.base('/internets-of-thing');
    }

// all routes should hide .page containers
page('/*', (ctx, next) => {
    $('.page').hide()
    next()
})

page('/', () => {

    console.log(parseURL(window.location.href))
    
    const path = parseURL(window.location.href).searchObject.route.replace('%2f','/')
        
    if (path) {
        page(path)
    } else {
        app.thingListPage.init()
    }
    
})

page('/admin', app.adminPage.init)
page('/create', app.createPage.init)

page.start()