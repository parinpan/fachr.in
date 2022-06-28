const repoCardItem = `
    <div class="column is-4">
        <div class="card is-shadowless">
            <div class="card-content">
                <div class="media">
                    <div class="media-content">
                        <p class="title is-5"><a target="_blank" href="{{repo_link}}">{{repo_name}}</a></p>
                        <p class="subtitle is-6" style="margin-top: 4px;overflow:hidden;text-overflow:ellipsis;-webkit-line-clamp:2;display:-webkit-box;-webkit-box-orient:vertical">{{repo_desc}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
`

const workCardItem = `
    <div metadata="{{metadata}}" class="column is-one-third work-item">
        <div class="card is-shadowless">
            <div class="card-image">
                <figure class="image image-no-padding">
                <img src="{{image}}" alt="{{image_alt}}">
                </figure>
            </div>

            <div class="control">
                <div class="tags has-addons">
                    <span class="tag is-medium">{{name}}</span>
                    <span class="tag is-dark is-medium">{{company}}</span>
                </div>
            </div>
        </div>
    </div>
`

function loadGithubRepositoryList(url) {
    fetch(url)
        .then(function(response) {
            if(response.status != 200) {
                return
            }

            response.json().then(function(repos) {
                createRepositoryList(repos)
            })
        })
}

function showWorkContent(modal, work, attachCancellables) {
    modal.setAttribute('class', 'modal is-active')

    const section = document.createElement('section')
    const metadata = JSON.parse(decodeURIComponent(work.getAttribute('metadata')))

    const getContentOrDefault = function(key, defaultValue) {
        return ((el = section.querySelector('#' + key)) && el.innerHTML.trim()) || defaultValue
    }

    const respond = function(response) {
        response.text().then(function(html) {
            section.innerHTML = html

            modal.innerHTML = modal.innerHTML
                .replace('{{name}}', metadata.name)
                .replace('{{description}}', getContentOrDefault('description', 'under construction'))
                .replace('{{role}}', getContentOrDefault('role', 'under construction'))
                .replace('{{stack}}', getContentOrDefault('tools', '<span class="tag is-large">under construction</span>'))

            attachCancellables()
        })
    }

    fetch('content/works/gojek/' + metadata.source + '.html').then(respond).catch(function(error) { respond(new Response()) })
}

function prepareWorkModal(items) {
    const modal = document.querySelector('#work-modal')
    const defaultContent = modal.innerHTML

    const closeModal = function(event) {
        const e = event || window.event

        if(e.keyCode != undefined && e.keyCode != 27) {
            return
        }

        modal.setAttribute('class', 'modal')
        modal.innerHTML = defaultContent
    }


    const attachCancellables = function() {
        document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button')
             .forEach(function(cancelable) {
                 cancelable.onclick = closeModal
             })
     }

    items.forEach(function(item) {
        item.onclick = function(e) {
            showWorkContent(modal, item, attachCancellables)
            attachCancellables()
        }
    })

    document.addEventListener('keydown', closeModal)
}

function createWorkList(works) {
    const el = document.querySelector('#latest-works')

    works.forEach(function(work) {
        const metadata = JSON.stringify(work)

        el.innerHTML += workCardItem
            .replace('{{name}}', work.name)
            .replace('{{image_alt}}', work.name)
            .replace('{{company}}', work.company)
            .replace('{{image}}', work.image)
            .replace('{{metadata}}', encodeURIComponent(metadata))
    })

    prepareWorkModal(el.querySelectorAll('.work-item'))
}

function createRepositoryList(repos) {
    const repoListEl = document.querySelector('#github-repo-list')
    const reversedRepos = (repos || []).reverse().filter(function(repo) { return repo.description }).slice(0, 5)

    reversedRepos.forEach(function(repo) {
        if(repo.description) {
            repoListEl.innerHTML += repoCardItem
                .replace('{{repo_link}}', repo.html_url)
                .replace('{{repo_name}}', repo.full_name)
                .replace('{{repo_desc}}', repo.description)
        }
    })

    repoListEl.innerHTML += repoCardItem
        .replace('{{repo_link}}', 'https://github.com/parinpan')
        .replace('{{repo_name}}', `<em>More...</em>`)
        .replace('{{repo_desc}}', `<br/><br/>`);
}

loadGithubRepositoryList('https://api.github.com/users/parinpan/repos')

ketikin('.typing-text', {
    speed: 65,
    loop: true
})

createWorkList([
    {
        name: 'Driver Karma V2',
        company: 'Gojek',
        image: 'static/image/driver-karma.webp',
        source: 'driver-karma-v2'
    },
    {
        name: 'Tipping Widget',
        company: 'Gojek',
        image: 'static/image/tipping-service.webp',
        source: 'tipping-widget'
    },
    {
        name: 'Chat Intent Classification',
        company: 'Gojek',
        image: 'static/image/chat-intent-detection.webp',
        description: 'under construction',
        role: 'under construction',
        source: 'chat-intent'
    },
    {
        name: 'Shuffle Cards Provider',
        company: 'Gojek',
        image: 'static/image/shuffle-cards.webp',
        source: 'shuffle-cards'
    },
    {
        name: 'New Service Types Launch',
        company: 'Gojek',
        image: 'static/image/service-type-launches.webp',
        source: 'service-types-launch'
    },
    {
        name: 'Service Restricted Area',
        company: 'Gojek',
        image: 'static/image/area-based-service-restriction.webp',
        source: 'service-restricted-area'
    }
])
