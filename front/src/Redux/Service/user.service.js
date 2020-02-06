export const fetchUserData = async () => {
    try {
        const response = await fetch('http://localhost:5000/films', {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
        const data = await response.toJson();
    } catch (e) {
        alert(e)
    }
}