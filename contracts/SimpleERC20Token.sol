// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

//ERC20 Token Standard #20 Interface
abstract contract ERC20Interface {
    function totalSupply() public view virtual returns (uint);
    function balanceOf(address tokenOwner) public view virtual returns (uint balance);
    function allowance(address tokenOwner, address spender) public view virtual returns (uint remaining);
    function transfer(address to, uint tokens) public virtual returns (bool success);
    function approve(address spender, uint tokens) public virtual returns (bool success);
    function transferFrom(address from, address to, uint tokens) public virtual returns (bool success);
 
    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
}

contract SimpleERC20Token is ERC20Interface {
    string public name;
    string public symbol;
    uint8 public decimals;  

    mapping(address => uint256) _balances;
    mapping(address => mapping (address => uint256)) _allowed;
    uint256 _totalSupply;

    constructor() { 
        name = "SimpleERC20TokenHSE";
        symbol = "SERCHSE";
        decimals = 5;

        _totalSupply = 10000;
        _balances[msg.sender] = _totalSupply;

        emit Transfer(address(0), msg.sender, _totalSupply);
    }  

    function totalSupply() public view override returns (uint256) {
	    return _totalSupply;
    }
    
    function balanceOf(address _owner) public view override returns (uint256 balance) {
        return _balances[_owner];
    }

    function transfer(address _to, uint256 _value) public override returns (bool success) {
        // VALIDATE TRANSFER
        require(_value <= _balances[msg.sender], "Not enough tokens");
        require(_balances[_to] + _value >= _balances[_to], "Negative number of tokens");
        //
        _balances[_to] = _balances[_to] + _value;
        _balances[msg.sender] = _balances[msg.sender] - _value;

        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public override returns (bool success) {
        // VALIDATE APPROVAL
        require(_value <= _balances[msg.sender]);
        //
        _allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function allowance(address _owner, address _spender) public view override returns (uint256 remaining) {
        return _allowed[_owner][_spender];
    }

    function transferFrom(address _from, address _to, uint256 _value) public override returns (bool success) {
        // VALIDATE TRANSFER_FROM
        require(_balances[_to] + _value >= _balances[_to]);
        require(_value <= _balances[_from]);    
        require(_value <= _allowed[_from][msg.sender]);
        //
        _balances[_to] = _balances[_to] + _value;
        _balances[_from] = _balances[_from] - _value;
        _allowed[_from][msg.sender] = _allowed[_from][msg.sender] - _value;
        
        emit Transfer(_from, _to, _value);
        return true;
    }

    function mint(uint256 _value) public returns (bool success) {
        // VALIDATE MINT
        require(_totalSupply + _value >= _totalSupply);
        //
        _totalSupply = _totalSupply + _value;
        _balances[msg.sender] = _balances[msg.sender] + _value;
        return true;
    }
}