pragma solidity ^0.8.0;

contract SupplyChain {
    struct Product {
        string name;
        string category; // "Pharmaceutical" or "Coffee"
        string origin;
        string qrCode;
        string status;
        address currentHolder;
    }

    mapping(string => Product) public products; // Mapping QR code to Product details
    event ProductAdded(string qrCode, string name, string category, string origin);
    event ProductUpdated(string qrCode, string status, address updatedBy);

    function addProduct(
        string memory _qrCode,
        string memory _name,
        string memory _category,
        string memory _origin
    ) public {
        require(bytes(products[_qrCode].qrCode).length == 0, "Product already exists");
        require(
            keccak256(bytes(_category)) == keccak256(bytes("Pharmaceutical")) ||
            keccak256(bytes(_category)) == keccak256(bytes("Coffee")),
            "Invalid category"
        );
        
        products[_qrCode] = Product(_name, _category, _origin, _qrCode, "Created", msg.sender);
        emit ProductAdded(_qrCode, _name, _category, _origin);
    }

    function updateProductStatus(string memory _qrCode, string memory _status) public {
        require(bytes(products[_qrCode].qrCode).length != 0, "Product not found");
        products[_qrCode].status = _status;
        products[_qrCode].currentHolder = msg.sender;
        emit ProductUpdated(_qrCode, _status, msg.sender);
    }

    function getProductDetails(string memory _qrCode) public view returns (
        string memory name,
        string memory category,
        string memory origin,
        string memory status,
        address currentHolder
    ) {
        require(bytes(products[_qrCode].qrCode).length != 0, "Product not found");
        Product memory product = products[_qrCode];
        return (product.name, product.category, product.origin, product.status, product.currentHolder);
    }
}
