// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;


contract MyMapper {

    struct MyStructItem {
        string text;
        int num;
        bool flag;
    }

    // Events
    event Set(address indexed _from, address indexed _key, MyStructItem _value);
    event Delete(address indexed _from, address indexed _key);

    // Storage
    mapping(address => MyStructItem) _mapping;

    function getValue(address key) public view returns (MyStructItem memory) {
        return _mapping[key];
    }

    function setValue(address key, string calldata str, int num, bool flag) public returns (bool ok) {
        _mapping[key] = MyStructItem(str, num, flag);
        emit Set(msg.sender, key, _mapping[key]);
        return true;
    }

    function deleteValue(address key) public returns (bool ok) {
        delete _mapping[key];
        emit Delete(msg.sender, key);
        return true;
    }

}