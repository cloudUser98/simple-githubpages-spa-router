function page_404() {

    let content = document.getElementById("content");

    content!.innerHTML = `
        <h1>Page Not Found</h1>
        <p>
            PAGE NOT FOUND ERROR 404
        </p>
    `
}

export default page_404;
