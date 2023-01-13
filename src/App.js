import "./styles.css";
import { ENS } from "@ensdomains/ensjs";
import { providers } from "ethers";

const client = new ENS();

async function setENSContent() {
  try {
    const provider = new providers.Web3Provider(window.ethereum, "goerli");
    await client.setProvider(provider);

    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    const address = await signer.getAddress();
    console.log(address);
    const ens = await provider.lookupAddress(address);
    console.log(ens);
    const tx = await client.setRecords(ens, {
      records: {
        contentHash: "ar://tnLgkAg70wsn9fSr1sxJKG_qcka1gJtmUwXm_3_lDaI"
      }
    });
    await tx.wait();
  } catch (error) {
    if (error?.message.includes("missing provider")) {
      alert("to run this example you need metamask");
      return;
    }
    if (error?.message.includes("user rejected transaction")) {
      alert("oh well, you rejected to change it.");
      return;
    }
    console.warn(error);
  }
}

export default function App() {
  return (
    <div className="App">
      <h1>Hello there!</h1>
      <div>
        <img
          src="https://wzzobeaihpjqwj7v6sv5ntcjfbx6u4sgwwajwzstaxtp677fbwra.arweave.net/tnLgkAg70wsn9fSr1sxJKG_qcka1gJtmUwXm_3_lDaI"
          alt="content"
          width="150px"
        />
      </div>
      <button
        onClick={() => {
          setENSContent();
        }}
      >
        Change your content
      </button>
    </div>
  );
}
