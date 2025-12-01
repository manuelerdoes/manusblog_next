
// 1.2.10 01.12.2025    M. Erdös    fixed big blog header in search or blogs with little content
// 1.2.9  20.11.2025    M. Erdös    added max-width to containero and navbar because it looked shit on very wide screens
// 1.2.8  13.11.2025    M. Erdös    changed overflow scroll to auto and to hidden in the left search bar
// 1.2.7  18.08.2025    M. Erdös    user needs role to create comment. fixed comments by changing fk to slug instead of id
// 1.2.6  18.08.2025    M. Erdös    user needs to have a role to create a blogpost. changed max width for responsive design
// 1.2.5  03.02.2025    M. Erdös    added clear button for search inputs to make it work with all browsers.
// 1.2.4  03.02.2025    M. Erdös    changed input type of search fields to "search" to enable clear button
// 1.2.3  03.02.2025    M. Erdös    set theme onchange in new and edit blog form
// 1.2.2  01.02.2025    M. Erdös    mobile picture upload no overflow
// 1.2.1  01.02.2025    M. Erdös    fixed bug where blog and file couldn't be connected in the db.
// 1.2.0  01.02.2025    M. Erdös    added username to blogpost in db. and made author in details clickable. ATTENTION: DB alteration needed
// 1.1.9  01.02.2025    M. Erdös    topic and tags in Details now clickable -> link to search
// 1.1.8  01.02.2025    M. Erdös    fixed bug where pics and files linked with a blog weren't shown in the uploaders
// 1.1.7  30.01.2025    M. Erdös    copy code button design improvement
// 1.1.6  30.01.2025    M. Erdös    design: brighter background in code snippets in robotics theme. copy button in code snippets (works only with safari)
// 1.1.5  28.01.2025    M. Erdös    unique avatar picture names. should solve problems with mobile direct pics
// 1.1.4  28.01.2025    M. Erdös    deleting non-public blogposts works now.
// 1.1.3  28.01.2025    M. Erdös    dompurify now allows iframes. embedding yt-videos now possible
// 1.1.2  26.01.2025    M. Erdös    added fileuploading and made filenames unique
// 1.1.1  26.01.2025    M. Erdös    EditBlogForm fetches data every time now, without cache
// 1.1.0  25.01.2025    M. Erdös    align text left instead of justify
// 1.0.10 25.01.2025    M. Erdös    Design improvements: more space for comments and bigger font size for inputs.
// 1.0.9  25.01.2025    M. Erdös    Blog content table autowidth. and coloured links in about.
// 1.0.8  25.01.2025    M. Erdös    Fixed UpdateBlog function to run with slugs. started creation documentation. bold h4 in content.
// 1.0.7  21.01.2025    M. Erdös    Search.jsx uses slugs now. Search mobile design improvement
// 1.0.6  20.01.2025    M. Erdös    Show search results without author while querying author
// 1.0.5  20.01.2025    M. Erdös    Introduced slugs for urls. ATTENTION: DB alteration needed. dynamic page titles
// 1.0.4  20.01.2025    M. Erdös    About content loaded from markdown
// 1.0.3  19.01.2025    M. Erdös    Removed loading gifs
// 1.0.2  18.01.2025    M. Erdös    Design improvements. Title aligned to content. fixed weird borders and backgrounds
// 1.0.1  18.01.2025    M. Erdös    Bugfix for Blog not showing pictures when unauthenticated
// 1.0.0  11.12.2024    M. Erdös    First state where it can be used productively
// 0.0.3  13.10.2024    M. Erdös    Added mysql db script and some dbActions
// 0.0.2  12.10.2024    M. Erdös    Added most of the design elements
// 0.0.1   1.10.2024    M. Erdös    Initial

export const appVersion = "1.2.10";