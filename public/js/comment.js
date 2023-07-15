const text = document.getElementById('comment');
const blog_id = document.getElementById('blogId').value;

async function createComment(event) {
    event.preventDefault();
    const content = text.value.trim()
    if (content) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({blog_id, content}),
            headers: {
                'Content-Type': 'application/json'
              }
        })
        if (response.ok) {
            document.location.replace('/dashboard');
          } else {
            alert(response.statusText);
          }
    }
}


document
.getElementById('comment-btn')
.addEventListener('click', createComment)