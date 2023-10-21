const app = require('../app'); // Import your Express app
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe('API Tests', () => {
  it('should get a list of books', (done) => {
    chai
      .request(app)
      .get('/api/books') // Use the correct route path without the full URL
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should add a new book', (done) => {
    const newBook = {
      title: 'Test Book',
      author: 'Test Author', // Provide the author's name
      journal_name: 'Test Journal',
      published_date: '2023-10-22',
      volume: '1',
      number: '1',
      pages: '10-20',
      DOI: 'test-doi',
      authors: 'Author Name', // Provide the author's name here as well
    };
    
    

    chai
      .request(app)
      .post('/api/books') // Use the correct route path without the full URL
      .send(newBook)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').to.equal('Book added successfully');
        expect(res.body).to.have.property('book');
        done();
      });
  });
});
