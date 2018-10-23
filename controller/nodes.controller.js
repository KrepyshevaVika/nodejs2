const db = require('../models/index.js');
const NetworkNode = db.node;
const NodeTypes = db.node_type;

NodeTypes.hasMany(NetworkNode, {foreignKey: 'type_id'});
NetworkNode.belongsTo(NodeTypes, {foreignKey: 'type_id'});

// hard query
exports.findChooseFields = (req, res) => {
    db.sequelize.query(
            `SELECT name FROM node;`,
            { type: db.sequelize.QueryTypes.SELECT }
        ).then(selectElems => {
            res.json(selectElems);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({msg: "error", details: err});
        });
};

// get all WHERE node_id IS NULL
exports.findTopNodeAll = (req, res) => {
    NetworkNode.findAll({ where: { node_id: null }, include: [ NodeTypes ], order: ['id'] }).then(NetworkNodes => {
            res.json(NetworkNodes);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({msg: "error", details: err});
        });
};

// get all 
exports.findAll = (req, res) => {
    NetworkNode.findAll({ include: [ NodeTypes ], order: ['id'] }).then(NetworkNodes => {
            res.json(NetworkNodes);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({msg: "error", details: err});
        });
};

// get for parentId
exports.findChildren = (req, res) => {	
    const parentId = req.params.id;
    NetworkNode.findAll({ where: { node_id: parentId }, include: [ NodeTypes ], order: ['id'] }).then(NetworkNode => { 
            res.json(NetworkNode);
        }).catch(err => {
            console.log(err);
            res.status(500).json({msg: "error", details: err});
        });
};

// Find item by Id
exports.findById = (req, res) => {	
	NetworkNode.findById(req.params.id, { include: [ NodeTypes ] }).then(NetworkNode => {
			res.json(NetworkNode);
		}).catch(err => {
			console.log(err);
			res.status(500).json({msg: "error", details: err});
		});
};

exports.delete = (req, res) => {
    const id = req.params.id;
    NetworkNode.destroy({
            where: { id: id }
        }).then(() => {
            res.status(200).json( { msg: 'Deleted Successfully -> NetworkNode Id = ' + id } );
        }).catch(err => {
            console.log(err);
            res.status(500).json({msg: "error", details: err});
        });
}

// post
//INSERT INTO menu_item (node_id, name) VALUES (NULL, 'item7');
exports.create = (req, res) => {
    NetworkNode.create(req.body).then(NetworkNode => {	
            res.json(NetworkNode);
        }).catch(err => {
            console.log(err);
            res.status(500).json({msg: "error", details: err});
        });
}

exports.update = (req, res) => {
	const id = req.body.id;
	NetworkNode.update( req.body, 
        { where: {id: id} }).then(() => {
            res.status(200).json( { mgs: "Updated Successfully -> Customer Id = " + id } );
        }).catch(err => {
            console.log(err);
            res.status(500).json({msg: "error", details: err});
        });
};



 