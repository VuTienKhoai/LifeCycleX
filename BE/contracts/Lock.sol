// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ProductTracking {
    struct ProductRecord {
        string productId;
        string serialNumber;
        string action;
        string fromId;
        string fromRole;
        string ownerId;
        string ownerRole;
        uint256 timestamp;
        string description;
    }
    
    mapping(string => ProductRecord[]) private productHistory;
    mapping(string => bool) private productExists;
    
    address public admin;
    
    event ProductRecordAdded(
        string indexed productId,
        string serialNumber,
        string action,
        uint256 timestamp
    );
    
    constructor() {
        admin = msg.sender;
    }
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call");
        _;
    }
    
    function addProductRecord(
        string memory _productId,
        string memory _serialNumber,
        string memory _action,
        string memory _fromId,
        string memory _fromRole,
        string memory _ownerId,
        string memory _ownerRole,
        string memory _description
    ) public onlyAdmin returns (bool) {
        ProductRecord memory newRecord = ProductRecord({
            productId: _productId,
            serialNumber: _serialNumber,
            action: _action,
            fromId: _fromId,
            fromRole: _fromRole,
            ownerId: _ownerId,
            ownerRole: _ownerRole,
            timestamp: block.timestamp,
            description: _description
        });
        
        productHistory[_productId].push(newRecord);
        productExists[_productId] = true;
        
        emit ProductRecordAdded(_productId, _serialNumber, _action, block.timestamp);
        
        return true;
    }
    
    function getProductHistoryCount(string memory _productId) public view returns (uint256) {
        return productHistory[_productId].length;
    }
    
    function getProductRecord(string memory _productId, uint256 _index) 
        public 
        view 
        returns (
            string memory serialNumber,
            string memory action,
            string memory fromId,
            string memory fromRole,
            string memory ownerId,
            string memory ownerRole,
            uint256 timestamp,
            string memory description
        ) 
    {
        require(productExists[_productId], "Product does not exist");
        require(_index < productHistory[_productId].length, "Index out of bounds");
        
        ProductRecord memory record = productHistory[_productId][_index];
        
        return (
            record.serialNumber,
            record.action,
            record.fromId,
            record.fromRole,
            record.ownerId,
            record.ownerRole,
            record.timestamp,
            record.description
        );
    }
    
    function productExistsOnChain(string memory _productId) public view returns (bool) {
        return productExists[_productId];
    }
}