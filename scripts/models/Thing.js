var app = app || {};

(module => {

    // Note: hard coded API URL - adjust as needed for local development
    // Or better, write logic to abstract away local vs remote
    const url = 'https://internets-of-thing-api.herokuapp.com/api/v1/things';

    const Thing = {}

    Thing.all = []

    Thing.fetchAll = () => {

        return $.getJSON(url).then(things => {
        
            Thing.all = things
        
            Thing.all.sort((a,b) => {
                if (a.name > b.name) {
                    return 1
                } else if (a.name < b.name) {
                    return -1
                } else {
                    return 0
                }
            })
        })
    }

    Thing.fetchOne = (id) => {
        return $.getJSON(url + '/' + id)
            .catch(err => console.error(err))
    }

    Thing.create = thing =>
        $.post(url, thing)
            .catch(err => console.error(err))

    Thing.update = thing => {
        return $.ajax({
            url: url + '/' + thing.id,
            method: 'PUT',
            data: thing
        }).then(result => console.log(result))
            .catch(err => console.error(err))
    }

    Thing.delete = id => $.ajax({

        url: url + '/' + id,
        method: 'DELETE',

    }).then(() => {

        const index = Thing.all.findIndex(thing => thing.id === id)

        Thing.all.splice(index, 1)

    }).catch(err => console.error(err))


    module.Thing = Thing

})(app)
