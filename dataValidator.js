function DataValidator()
{
	var validatedInput = {};
	this.username = function(username)
	{
		console.log('validating username');
		if(username === null || typeof username !== 'string')
		{
			console.log('Invalid username!' + username);
			throw error;
		}
		validatedInput.username = username;
		return this;
	};
	
	this.password = function(password)
	{
		console.log('validating password');
		if(password === null || typeof password !== 'string')
		{
			console.log('invalid password!'+password);
			throw error;
		}
		validatedInput.password = password;
		
		return this;
	};
	
	this.getResult = function()
	{
		console.log('returning result');
		return validatedInput;
	}
};

module.exports = DataValidator;