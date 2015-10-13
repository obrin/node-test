let jordan = require('../../lib/jordan');
let expect = require('chai').expect;
let sinon = require('sinon');

describe('Jordan library', () => {

  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
      expect([1,2,3].indexOf(5)).to.equal(-1);
    })
  })

  describe('Add values', () => {
    it('should add two values', () => {
      let addv = jordan.add(1,2);

      expect(addv).to.equal(3);
    })

    it('should call add method', () => {
      sinon.spy(jordan, 'add');

      jordan.add2(1,2);

      expect(jordan.add.calledOnce).to.be.true;
      expect(jordan.add.args[0]).to.have.length(2);

      jordan.add.restore();
    })

    it('should always return the result of add', done => {
      sinon.stub(jordan, 'add').returns(0);

      jordan.addc(12, 12, res => {
        expect(res).to.equal(0);

        jordan.add.restore();
        done()
      })
    })

    it('should always pass a value to add', done => {
      let mock = sinon.mock(jordan);
      mock.expects('add').twice().withExactArgs(1, 1);

      jordan.addc(1, 1, res => {
        jordan.addc(1, 1, result => {
          mock.verify();
          done();
        });
      });
    })
  })
})
