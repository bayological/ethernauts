const CID = require('cids');
const Hash = require('ipfs-only-hash');

/**
 * It makes sure the ipfs:// prefix exists
 * @param {*} cidOrURI The CID or the URI of ipfs
 * @returns {string}
 */

const ensureIpfsUriPrefix = (cidOrURI) => {
  let uri = cidOrURI.toString();
  if (!uri.startsWith('ipfs://')) {
    uri = 'ipfs://' + cidOrURI;
  }
  // Avoid the Nyan Cat bug (https://github.com/ipfs/go-ipfs/pull/7930)
  if (uri.startsWith('ipfs://ipfs/')) {
    uri = uri.replace('ipfs://ipfs/', 'ipfs://');
  }

  return uri;
};

/**
 * It removes ipfs:// from the string
 * @param {string} cidOrURI The CID or the URI of ipfs
 * @returns {string}
 */

const stripIpfsUriPrefix = (cidOrURI) => {
  if (cidOrURI.startsWith('ipfs://')) {
    return cidOrURI.slice('ipfs://'.length);
  }
  return cidOrURI;
};

/**
 * It returns the CID
 * @param {string} cidOrURI The CID or the URI of ipfs
 * @returns {string} ipfs cid
 */
const extractCID = (cidOrURI) => {
  // remove the ipfs:// prefix, split on '/' and return first path component (root CID)
  const [cidString] = stripIpfsUriPrefix(cidOrURI).split('/');

  return new CID(cidString);
};

/**
 * It calculates the IPFS hash for some data
 * @param {array|string|buffer|arrayBuffer} object 
 * @returns {string} ipfs hash
 */

const getIPFSHash = async (object) => {
  const data = Buffer.from(object);
  const hash = await Hash.of(data);

  return hash;
}

module.exports = {
  ensureIpfsUriPrefix,
  stripIpfsUriPrefix,
  extractCID,
  getIPFSHash,
};
