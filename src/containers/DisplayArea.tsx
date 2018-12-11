import * as React from "react";


const foos: any[] = [];
while (foos.length < 500){
  foos.push(<div>foo</div>)
}


const placeholder = () => <div>{foos}</div>;

export default placeholder;
