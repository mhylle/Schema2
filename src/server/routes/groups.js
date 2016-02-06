var _ = require('lodash');

var seedData = require('../framework/data/Group_mock_data.json');

module.exports = function (app) {
    var _groups = seedData;

    app.post('/group', function (req, res) {
        _groups.push(req.body);
        res.json({info: 'group created successfully'});
    });

    app.get('/group', function (req, res) {
        res.send(_groups);
    });

    app.get('/group/id/:id', function (req, res) {
        res.send(
            _.find(
                _groups,
                {id: req.params.id}
            )
        );
    });

    app.put('/group/id/:id', function (req, res) {
        var index = _.findIndex(
            _groups,
            {
                id: req.params.id
            }
        );
        _.merge(_groups[index], req.body);
        res.json({info: 'group updated successfully'});
    });

    app.put('/group', function (req, res) {
        var group = req.body.group;
        var user = req.body.user;
        var dataGroup = _.find(_groups,
            {id: group.id});
        if (!dataGroup) {
            res.json({info: 'no group found'});
        }

        var users = dataGroup.users;
        var dataUser = _.find(users, {id: user.id});
        if (!dataUser || dataUser === null || dataUser === undefined) {
            users.push(user);
        }
        group.users = users;
        var index = _.findIndex(
            _groups,
            {
                id: req.params.id
            }
        );
        _.merge(_groups[index], group);

        res.json(group);
    });

    app.delete('/group/id/:id', function (req, res) {
        _.remove(_groups, function (group) {
            return group.id === req.params.id;
        });
        res.json({info: 'group removed successfully'});
    });
};

