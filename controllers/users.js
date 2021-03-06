const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.register = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Bem-vindo(a) ao DashGen!')
            res.redirect('/');
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}

module.exports.login = (req, res) => {
    req.flash('success', 'Bem-vindo(a) de volta!');
    let redirectUrl = req.session.returnTo || '/';
    // if (redirectUrl.indexOf('reviews') !== -1) {
    //     redirectUrl = '/courseDashboards/index';
    // }
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'Você saiu da sua conta com sucesso.');
    res.redirect('/');
}