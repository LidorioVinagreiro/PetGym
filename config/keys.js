//mongoose.connect('mongodb://username:password@host:port/database?options...', {useNewUrlParser: true});
//mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true});
//dbPassword1 = encodeURIComponent('password');
dbPassword = 'mongodb://chefe:password@mongodb:27017/QuintaMiao2';
// template de string connection 'mongodb://user:pass@host:port/database'

module.exports = {
    mongoURI: dbPassword
};
