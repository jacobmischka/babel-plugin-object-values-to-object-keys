export default function({types: t}){
	return {
		visitor: {
			CallExpression(path){
				if(t.isMemberExpression(path.node.callee)
						&& t.isIdentifier(path.node.callee.object, {name: 'Object'})
						&& t.isIdentifier(path.node.callee.property, {name: 'values'})){
					let obj = path.node.arguments[0];
					
					console.log(obj);
					
					path.replaceWith(
						t.callExpression(
							t.memberExpression(
								t.callExpression(
									t.memberExpression(
										t.identifier('Object'),
										t.identifier('keys')
									),
									[
										obj
									]
								),
								t.identifier('map')
							),
							[
								t.arrowFunctionExpression(
									[
										t.identifier('key')
									],
									t.memberExpression(
										obj,
										t.identifier('key'),
										true
									)
								)
							]
						)
					);
					
					
				}
			}
		}
	};
}
