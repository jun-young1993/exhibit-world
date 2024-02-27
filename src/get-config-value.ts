export function getEnv(
	key: string,
	defaultValue?: string,
	env = process.env
      ): string {
	
	const reactKey = `REACT_APP_${key}`;
	console.log(reactKey);
	console.log('get env process env',process.env[reactKey]);
	console.log('get env env',env[reactKey]);
	const value = env[reactKey];
	
	if (value !== undefined) {
	  return value
	}
      
	if (defaultValue !== undefined) {
	  return defaultValue
	}
      
	throw new Error(`Config error: missing required env variable "${reactKey}"`)
      }