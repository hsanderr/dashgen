const express = require('express');
const router = express.Router();
const courseDashboards = require('../controllers/courseDashboards');
const {
    isCourseDashboardAuthor,
    isLoggedIn,
    validateNewCourseDashboard,
    validateEditCourseDashboard,
    validateVideo
} = require('../middleware');
const wrapAsync = require('../utils/wrapAsync');

router.route('/')
    .get(wrapAsync(courseDashboards.index))
    .post(isLoggedIn, validateNewCourseDashboard, wrapAsync(courseDashboards.createCourseDashboard));

router.route('/new')
    .get(isLoggedIn, wrapAsync(courseDashboards.renderNewCourseDashboardForm));

router.route('/:id')
    .get(isLoggedIn, wrapAsync(courseDashboards.showCourseDashboard))
    .put(isLoggedIn, isCourseDashboardAuthor, validateEditCourseDashboard, wrapAsync(courseDashboards.updateCourseDashboard))
    .delete(isLoggedIn, isCourseDashboardAuthor, wrapAsync(courseDashboards.deleteCourseDashboard));

router.route('/:id/dash/:videoIndex')
    .get(wrapAsync(courseDashboards.renderCourseDashboard));

router.route('/:id/:videoId')
    .get(isLoggedIn, isCourseDashboardAuthor, wrapAsync(courseDashboards.renderEditVideoInformationForm))
    .put(isLoggedIn, isCourseDashboardAuthor, validateVideo, wrapAsync(courseDashboards.updateVideoInformation));

module.exports = router;