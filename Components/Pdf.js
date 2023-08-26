import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import {htmlStyles} from './Pdf-css';


export default function Pdf() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const html = `<html>
  
  <head>
	  <meta charset="utf-8">
	  <title>Invoice</title>
	  
	  <link rel="license" href="https://www.opensource.org/licenses/mit-license/">
	  <style>
              ${htmlStyles}
            </style>
	 
  </head>
  <body>
	  <header>
		  <h1>Invoice</h1>
		  <address contenteditable>
			  <p>Jonathan Neal</p>
			  <p>101 E. Chapman Ave<br>Orange, CA 92866</p>
			  <p>(800) 555-1234</p>
		  </address>
		  <span><img alt="" src="http://www.jonathantneal.com/examples/invoice/logo.png"><input type="file" accept="image/*"></span>
	  </header>
	  <article>
		  <h1>Recipient</h1>
		  <address contenteditable>
			  <p>Some Company<br>${name}</p>
		  </address>
		  <table class="meta">
			  <tr>
				  <th><span contenteditable>Invoice #</span></th>
				  <td><span contenteditable>101138</span></td>
			  </tr>
			  <tr>
				  <th><span contenteditable>Date</span></th>
				  <td><span contenteditable>January 1, 2012</span></td>
			  </tr>
			  <tr>
				  <th><span contenteditable>Amount Due</span></th>
				  <td><span id="prefix" contenteditable>$</span><span>${amount}</span></td>
			  </tr>
		  </table>
		  <table class="inventory">
			  <thead>
				  <tr>
					  <th><span contenteditable>Item</span></th>
					  <th><span contenteditable>Description</span></th>
					  <th><span contenteditable>Rate</span></th>
					  <th><span contenteditable>Quantity</span></th>
					  <th><span contenteditable>Price</span></th>
				  </tr>
			  </thead>
			  <tbody>
				  <tr>
					  <td><a class="cut">-</a><span contenteditable>Front End Consultation</span></td>
					  <td><span contenteditable>Experience Review</span></td>
					  <td><span data-prefix>$</span><span contenteditable>150.00</span></td>
					  <td><span contenteditable>4</span></td>
					  <td><span data-prefix>$</span><span>${amount}</span></td>
				  </tr>
			  </tbody>
		  </table>
		  <a class="add">+</a>
		  <table class="balance">
			  <tr>
				  <th><span contenteditable>Total</span></th>
				  <td><span data-prefix>$</span><span>${amount}</span></td>
			  </tr>
			  <tr>
				  <th><span contenteditable>Amount Paid</span></th>
				  <td><span data-prefix>$</span><span contenteditable>0.00</span></td>
			  </tr>
			  <tr>
				  <th><span contenteditable>Balance Due</span></th>
				  <td><span data-prefix>$</span><span>${amount}</span></td>
			  </tr>
		  </table>
	  </article>
	  <aside>
		  <h1><span contenteditable>Additional Notes</span></h1>
		  <div contenteditable>
			  <p>A finance charge of 1.5% will be made on unpaid balances after 30 days.</p>
		  </div>
	  </aside>
  </body>
  
</html>
  
  `;

  let generatePdf = async () => {
    const file = await printToFileAsync({
      html: html,
      base64: false,
    });

    await shareAsync(file.uri);
  };
  return (
    <View style={styles.container}>
      <Text>Enter name:</Text>
      <TextInput
        placeholder="Your Name"
        style={styles.input}
        onChangeText={(value) => setName(value)}
      />

      <Text>Enter age:</Text>
      <TextInput
        placeholder="Amount"
        style={styles.input}
        onChangeText={(value) => setAmount(value)}
      />

      <Button title="Generate PDF" onPress={generatePdf} />

      <Text style={styles.result}>
        name: {name}, amount: {amount}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: 200,
  },
});

// const htmlStyles = `
// *{
//   border: 0;
//   box-sizing: content-box;
//   color: inherit;
//   font-family: inherit;
//   font-size: inherit;
//   font-style: inherit;
//   font-weight: inherit;
//   line-height: inherit;
//   list-style: none;
//   margin: 0;
//   padding: 0;
//   text-decoration: none;
//   vertical-align: top;
// }

// h1 { font: bold 100% sans-serif; letter-spacing: 0.5em; text-align: center; text-transform: uppercase; }

// /* table */

// table { font-size: 75%; table-layout: fixed; width: 100%; }
// table { border-collapse: separate; border-spacing: 2px; }
// th, td { border-width: 1px; padding: 0.5em; position: relative; text-align: left; }
// th, td { border-radius: 0.25em; border-style: solid; }
// th { background: #EEE; border-color: #BBB; }
// td { border-color: #DDD; }

// /* page */

// html { font: 16px/1 'Open Sans', sans-serif; overflow: auto; }
// html { background: #999; cursor: default; }

// body { box-sizing: border-box;margin: 0 auto; overflow: hidden; padding: 0.25in; }
// body { background: #FFF; border-radius: 1px; box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5); }

// /* header */

// header { margin: 0 0 3em; }
// header:after { clear: both; content: ""; display: table; }

// header h1 { background: #000; border-radius: 0.25em; color: #FFF; margin: 0 0 1em; padding: 0.5em 0; }
// header address { float: left; font-size: 75%; font-style: normal; line-height: 1.25; margin: 0 1em 1em 0; }
// header address p { margin: 0 0 0.25em; }
// header span, header img { display: block; float: right; }
// header span { margin: 0 0 1em 1em; max-height: 25%; max-width: 60%; position: relative; }
// header img { max-height: 100%; max-width: 100%; }

// /* article */

// article, article address, table.meta, table.inventory { margin: 0 0 3em; }
// article:after { clear: both; content: ""; display: table; }
// article h1 { clip: rect(0 0 0 0); position: absolute; }

// article address { float: left; font-size: 125%; font-weight: bold; }

// /* table meta & balance */

// table.meta, table.balance { float: right; width: 36%; }
// table.meta:after, table.balance:after { clear: both; content: ""; display: table; }

// /* table meta */

// table.meta th { width: 40%; }
// table.meta td { width: 60%; }

// /* table items */

// table.inventory { clear: both; width: 100%; }
// table.inventory th { font-weight: bold; text-align: center; }

// table.inventory td:nth-child(1) { width: 26%; }
// table.inventory td:nth-child(2) { width: 38%; }
// table.inventory td:nth-child(3) { text-align: right; width: 12%; }
// table.inventory td:nth-child(4) { text-align: right; width: 12%; }
// table.inventory td:nth-child(5) { text-align: right; width: 12%; }

// /* table balance */

// table.balance th, table.balance td { width: 50%; }
// table.balance td { text-align: right; }

// /* aside */

// aside h1 { border: none; border-width: 0 0 1px; margin: 0 0 1em; }
// aside h1 { border-color: #999; border-bottom-style: solid; }
// `;