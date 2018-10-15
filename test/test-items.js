const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const Item = require('../models/item');

const sampleItem =     {
    "title": "New Pet",
    "item-title": "Small Doggo",
    "description": "A sweet little thing"
}

chai.use(chaiHttp);

describe('Items', ()  => {

  // TEST INDEX
  it('should index ALL items on / GET', (done) => {
    chai.request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html;
          done();
        });
  });

  // TEST NEW
  it('should display new form on /items/new GET', (done) => {
   chai.request(server)
     .get(`/items/new`)
       .end((err, res) => {
         res.should.have.status(200);
         res.should.be.html
         done();
       });
 });

  // TEST SHOW
it('should show a SINGLE item on /items/<id> GET', (done) => {
  var item = new Item(sampleItem);
  item.save((err, data) => {
    chai.request(server)
      .get(`/items/${data._id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html
        done();
      });
  });
});

// TEST CREATE
it('should create a SINGLE item on /items POST', (done) => {
  chai.request(server)
      .post('/items')
      .send(sampleItem)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html
        done();
      });
});

  // TEST EDIT
  it('should edit a SINGLE item on /items/<id>/edit GET', (done) => {
var item = new Item(sampleItem);
 item.save((err, data) => {
   chai.request(server)
     .get(`/items/${data._id}/edit`)
     .end((err, res) => {
       res.should.have.status(200);
       res.should.be.html
       done();
     });
 });
});

// TEST UPDATE
it('should update a SINGLE item on /items/<id> PUT', (done) => {
 var item = new Item(sampleItem);
 item.save((err, data)  => {
  chai.request(server)
   .put(`/items/${data._id}?_method=PUT`)
   .send({'title': 'Updating the title'})
   .end((err, res) => {
     res.should.have.status(200);
     res.should.be.html
     done();
   });
 });
});

// TEST DELETE
it('should delete a SINGLE item on /items/<id> DELETE', (done) => {
  var item = new Item(sampleItem);
  item.save((err, data)  => {
   chai.request(server)
    .delete(`/items/${data._id}?_method=DELETE`)
    .end((err, res) => {
      res.should.have.status(200);
      res.should.be.html
      done();
    });
  });
});
})
