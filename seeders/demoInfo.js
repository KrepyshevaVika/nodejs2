'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('node_type', [{
      name: 'control node',
      is_endpoint: false
    },{
      name: 'storage node',
      is_endpoint: true
    },{
      name: 'render node',
      is_endpoint: true
    },{
      name: 'node js',
      is_endpoint: true
    },{
      name: 'pacs',
      is_endpoint: true
    },{
      name: 'nginx',
      is_endpoint: false
    }], {}
    ).then(() => queryInterface.bulkInsert('node', [{
      name: 'control node',
      node_id: null,
      type_id: 1,
      description: `Do proident reprehenderit ad deserunt sint Lorem reprehenderit. Consequat voluptate laboris Lorem aliquip irure non dolore. Ea amet dolor non nostrud quis do aliquip mollit consectetur officia. Nisi laboris aute officia ipsum ad sit sunt.

Minim aliqua est et enim. Culpa enim tempor esse aliqua consectetur. Id et quis cupidatat enim ad id incididunt Lorem ipsum nisi sint. Deserunt minim esse enim pariatur non in. Ullamco ut excepteur irure nisi adipisicing aliqua id nisi incididunt velit dolor. Anim occaecat voluptate ullamco Lorem duis elit ex excepteur eiusmod.

Sunt sunt dolore anim aute in qui veniam minim dolore sunt. Commodo id id non laborum velit sint est eu quis nostrud culpa do. Ipsum dolore irure reprehenderit tempor labore laboris ea incididunt.

Consectetur sint aliquip aliquip laboris qui proident in sit pariatur. Esse Lorem esse fugiat nulla commodo irure sit officia eiusmod sit enim sint commodo ex. Adipisicing minim nisi eu irure cillum quis quis cupidatat minim labore incididunt excepteur dolor. Quis est minim proident amet esse pariatur id culpa. Consectetur amet consequat ex reprehenderit cillum sint fugiat non. Velit cillum reprehenderit officia excepteur consequat anim ut.`
    },{
      name: 'node js server 1',
      node_id: null,
      type_id: 4,
      description: `Ullamco cillum sit occaecat proident minim consectetur enim minim culpa in sint.`
    },{
      name: 'node js server 2',
      node_id: null,
      type_id: 4,
      description: `Labore nisi exercitation laborum incididunt ipsum tempor commodo cillum. Ullamco enim laboris velit elit ullamco excepteur. Lorem amet nostrud cillum aliquip excepteur aliqua. Aliquip sit laboris consequat do dolor in nisi duis nulla. Sint ea dolor occaecat sunt id. Amet ea aliquip elit ad amet incididunt dolor occaecat esse tempor laboris. Fugiat labore nulla do irure cupidatat culpa minim ipsum ea irure consequat eu consectetur.

Ut anim irure incididunt officia reprehenderit ex id proident aliquip dolore fugiat sint sunt. Qui magna ea nulla nulla fugiat ad ea do. Tempor tempor exercitation ullamco aliqua est laborum aute minim excepteur magna qui quis reprehenderit. Laboris esse sit laborum consectetur sunt excepteur enim sunt est nostrud duis ipsum. Eu pariatur ullamco reprehenderit ex laborum tempor. Occaecat eiusmod tempor aliquip enim sit sunt nostrud qui. Ad aute velit cillum quis culpa consectetur laborum consequat ipsum voluptate.`
    },{
      name: 'storage node 1',
      node_id: 1,
      type_id: 2,
      description: `Excepteur proident veniam pariatur qui incididunt adipisicing ea veniam nostrud ipsum minim ipsum anim occaecat. Sint magna in nulla minim ad magna tempor cupidatat laboris dolore pariatur enim ea officia. Mollit enim quis ex proident Lorem ea minim eiusmod. In nostrud consectetur veniam non ipsum quis dolore veniam deserunt aliqua sunt. Voluptate ullamco ex pariatur nisi commodo minim eu. Fugiat consequat cillum minim deserunt nostrud occaecat voluptate exercitation proident aliquip laboris occaecat labore. Eiusmod qui tempor aute consequat ea aliquip deserunt sunt eu labore.

Cupidatat dolore esse aliqua laborum occaecat. Deserunt irure laboris elit est. Voluptate do quis irure excepteur in.

Qui cillum pariatur dolor anim sit excepteur dolore amet pariatur. Laboris non voluptate officia aute irure aute cupidatat ipsum aliqua laborum amet. Consequat adipisicing qui culpa velit aliquip fugiat minim ipsum ea enim deserunt. Proident mollit commodo consectetur cillum id deserunt ut exercitation et officia. Ullamco est veniam esse cupidatat adipisicing ea eiusmod et cillum laborum do nulla. Magna velit exercitation cillum commodo sunt.

Mollit qui adipisicing sunt proident non ea ullamco qui proident enim esse aute exercitation dolore. Ipsum eiusmod excepteur veniam officia. Velit do laborum voluptate irure veniam nulla pariatur cillum elit commodo. Eu dolor eu anim quis pariatur cupidatat aute laborum magna nostrud ipsum. Cillum laborum ea non sunt. Et esse do in consectetur ipsum esse sunt enim ex aliqua id deserunt amet commodo. Dolor anim esse deserunt Lorem nisi officia cupidatat ut ut et velit voluptate eiusmod dolore.

Cillum est id velit consequat qui laboris sint laborum ipsum magna aliquip cillum laboris nulla. Ut deserunt aliquip et do nulla voluptate excepteur deserunt duis eiusmod. Adipisicing do est do eiusmod esse dolore commodo non amet eu elit Lorem.`
    },{
      name: 'storage node 2',
      node_id: 1,
      type_id: 2,
      description: `Dolor fugiat nulla ea occaecat cillum aute cupidatat.`
    },{
      name: 'render node 1',
      node_id: 1,
      type_id: 3,
      description: `Culpa aliqua ut proident ullamco officia ex dolore exercitation incididunt nostrud deserunt eu.`
    }], {}
    ));
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('node', null, {})
    .then(() => queryInterface.bulkDelete('node_type', null, {}));
  }
};
