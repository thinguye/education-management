const token = sessionStorage.getItem("token")
var path = '/dashboard'
var baseName = ''
if (!token){
    path = '/login'
}

const config = {
    // basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
    // like '/berry-material-react/react/default'
    basename: baseName,
    defaultPath: path,
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 12
};

export default config;
