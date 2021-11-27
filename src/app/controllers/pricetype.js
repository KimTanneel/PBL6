const db = require("../../utils/db");
const PriceType = db.price_type;
const Op = db.Sequelize.Op;

// [POST] ../PriceType/create
// Create and Save a new PriceType
// exports.create = async(req, res) => {

//     const { name, address, PriceTypes } = req.body;
//     const newPriceType = { name, address, PriceTypes };
//     const listPriceTypeBefore = await PriceType.findAll({
//         where: {
//             [Op.and]: [{ name: name }]
//         }
//     });
//     if (listPriceTypeBefore.length > 0) {
//         return res.status(400).send({
//             message: "PriceType with name already exists!"
//         });
//     }
//     //res.json(newPriceType)
//     // Save PriceType in the database
//     PriceType.create(newPriceType)
//         .then(data => {
//             return res.send(data);
//         })
//         .catch(err => {
//             return res.status(500).send({
//                 message: err.message || "Some error occurred while creating the PriceType."
//             });
//         });
// };

// [GET] ../PriceType/list
// Retrieve all PriceTypes
exports.findAll = (req, res) => {
    PriceType.findAll({})
        .then(data => {
            return res.send(data);
        })
        .catch(err => {
            return res.status(500).send({
                message: "Error retrieving all PriceTypes"
            });
        });
};

// [PUT] ../PriceType/id
// Update a PriceType by the id in the request
exports.update = (req, res) => {

    const id = req.params.id;
    const { description, price } = req.body
    const newPriceType = { description, price };
    PriceType.update(newPriceType, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "PriceType was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update PriceType with id=${id}. Maybe nothing changed or PriceType was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating PriceType with id=" + id
            });
        });
};

// [DELETE] ../PriceType/id
// Delete a PriceType with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    PriceType.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "PriceType was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete PriceType with id=${id}. Maybe PriceType was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete PriceType with id=" + id
            });
        });
};