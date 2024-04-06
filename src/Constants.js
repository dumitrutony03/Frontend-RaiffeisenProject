const prod = {
    url: {
        // For axios
        API_BASE_URL: 'https://myapp.herokuapp.com',
    }
}

const dev = {
    url: {
        // Base URL for CLIENT -> SERVER communication
        API_BASE_URL: 'http://localhost:8080'
    }
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod