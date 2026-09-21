(function () {
    const PDF_ENDPOINT = "https://project-my6fl.vercel.app/api/deal-killers";

    const FILTERS = [
      { key: "incomeIntegrity", label: "Income Integrity – Can reported income be independently verified?", short: "Income Integrity" },
      { key: "expenseReality", label: "Expense Reality – Are operating expenses credible for this asset and market?", short: "Expense Reality" },
      { key: "physicalCondition", label: "Physical Condition – Does the physical asset align with underwriting assumptions?", short: "Physical Condition" },
      { key: "deferredMaintenance", label: "Deferred Maintenance – Is deferred maintenance fully identified and capitalized?", short: "Deferred Maintenance" },
      { key: "marketDemand", label: "Market Demand – Is there durable demand at the assumed rent levels?", short: "Market Demand" },
      { key: "submarketQuality", label: "Submarket Quality – Does the submarket support long-term tenancy and liquidity?", short: "Submarket Quality" },
      { key: "tenantRisk", label: "Tenant Risk – Is tenant concentration or profile a material risk?", short: "Tenant Risk" },
      { key: "managementCapability", label: "Management Capability – Is there proven capacity to operate this asset type?", short: "Management Capability" },
      { key: "capitalStackRisk", label: "Capital Stack Risk – Does the capital structure amplify downside unacceptably?", short: "Capital Stack Risk" },
      { key: "exitLiquidity", label: "Exit Liquidity – Is there a realistic exit under stressed conditions?", short: "Exit Liquidity" },
      { key: "timingRisk", label: "Timing Risk – Is the execution timeline exposed to external shocks?", short: "Timing Risk" },
      { key: "unknowns", label: "Unknowns – Are there unresolved unknowns that materially affect risk?", short: "Unknowns" }
    ];

    function renderFilters() {
      const container = document.getElementById("dk-filters");
      container.innerHTML = "";

      FILTERS.forEach((f, idx) => {
        const card = document.createElement("div");
        card.className = "filter-card";

        const title = document.createElement("div");
        title.style.cssText = "font-weight:700;margin-bottom:14px;";
        title.textContent = ${idx + 1}. ${f.label};

        const group = document.createElement("div");
        group.className = "radio-row";

        ["Pass", "Fail", "Unverifiable"].forEach(opt => {
          const lbl = document.createElement("label");
          lbl.innerHTML = <input type="radio" name="${f.key}" value="${opt}" required> ${opt};
          group.appendChild(lbl);
        });

        card.appendChild(title);
        card.appendChild(group);
        container.appendChild(card);
      });
    }

    function computeDecision(filterResponses) {
      const responses = Object.values(filterResponses);

      if (responses.includes("Fail")) return "DEAL KILLER IDENTIFIED";
      if (responses.includes("Unverifiable")) return "DECISION INCOMPLETE";

      return "NO DEAL KILLERS IDENTIFIED";
    }

    function lockForm() {
      document.querySelectorAll("#dk-form input, #dk-form button").forEach(el => {
        el.disabled = true;
      });
    }

    function unlockForm() {
      document.querySelectorAll("#dk-form input, #dk-form button").forEach(el => {
        el.disabled = false;
      });
    }

    function setStatus(message) {
      document.getElementById("dk-status").textContent = message || "";
    }

    function safeFilenamePart(text) {
      return text
        .trim()
        .replace(/[^a-z0-9]/gi, "_")
        .replace(/_+/g, "_")
        .slice(0, 80);
    }

    document.getElementById("dk-form").addEventListener("submit", async function (e) {
      e.preventDefault();

      const dealReference = document.getElementById("dk-dealReference").value.trim();
      const email = document.getElementById("dk-email").value.trim();

      const filterResponses = {};

      FILTERS.forEach(f => {
        const selected = document.querySelector(input[name="${f.key}"]:checked);
        if (selected) filterResponses[f.key] = selected.value;
      });

      if (!dealReference || !email || Object.keys(filterResponses).length < 12) {
        alert("Please complete all fields.");
        return;
      }

      const decision = computeDecision(filterResponses);

      const filtersHtml = FILTERS.map((f, i) => {
        const resp = filterResponses[f.key];

        const pillClass =
          resp === "Fail" ? "fail" :
            resp === "Unverifiable" ? "unverifiable" :
              "pass";

        return 
        <div class="filter-item">
          <span class="filter-number">${i + 1}.</span>
          <span class="filter-label">${f.short}</span>
          <span class="filter-pill ${pillClass}">${resp.toUpperCase()}</span>
        </div>
      ;
      }).join("");

      const payload = {
        dealReference: dealReference,
        email: email,
        timestamp: new Date().toLocaleString("en-US", { timeZone: "America/Chicago" }),
        decision: decision,
        filters_html: filtersHtml,
        filters: filterResponses
      };

      try {
        lockForm();
        setStatus("Generating PDF...");

        const response = await fetch(PDF_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });

        let result = {};

        try {
          result = await response.json();
        } catch (jsonError) {
          throw new Error("Endpoint did not return JSON.");
        }

        if (!response.ok) {
          throw new Error(result.error || "PDF generation failed.");
        }

        if (!result.downloadUrl) {
          throw new Error("No download URL returned.");
        }

        document.getElementById("dk-form").style.display = "none";

        const successScreen = document.getElementById("dk-success");
        successScreen.style.display = "block";

        const downloadBtn = document.getElementById("dk-download-btn");
        downloadBtn.href = result.downloadUrl;
        downloadBtn.target = "_blank";
        downloadBtn.rel = "noopener";
        downloadBtn.download = Deal_Killers_${safeFilenamePart(dealReference)}.pdf;
        downloadBtn.textContent = "Download PDF";
        downloadBtn.classList.remove("disabled");
        downloadBtn.setAttribute("aria-disabled", "false");

        setStatus("");

        window.scrollTo({
          top: document.getElementById("dk-success").offsetTop - 20,
          behavior: "smooth"
        });

      } catch (err) {
        console.error("Deal Killers PDF error:", err);
        alert("Error generating PDF. Please try again.");
        unlockForm();
        setStatus("");
      }
    });

    renderFilters();
  })();

This is the JS I Was given. I think I just want to hardcode all the questions in? Do I have to use vercel? This is for a squarespace site