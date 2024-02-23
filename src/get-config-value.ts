export function getEnv(
	key: string,
	defaultValue?: string,
	env = process.env
      ): string {
	const reactKey = `REACT_APP_${key}`;
	const value = env[reactKey];
      
	if (value !== undefined) {
	  return value
	}
      
	if (defaultValue !== undefined) {
	  return defaultValue
	}
      
	throw new Error(`Config error: missing required env variable "${reactKey}"`)
      }