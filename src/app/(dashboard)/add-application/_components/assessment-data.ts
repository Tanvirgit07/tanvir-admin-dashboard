export interface AssessmentTable { title: string; headers: string[]; rows: string[][]; kind: string; }
export interface AssessmentSectionData { title: string; questions: { id: string; prompt: string }[]; table?: AssessmentTable; }
export const sections: AssessmentSectionData[] = [
  {
    "title": "Math: Decimals & Percentages",
    "questions": [
      {
        "id": "1A-a",
        "prompt": "A small business had gross sales of $48,750.00 in Q1. Calculate sales tax owed at a rate of 6.5%."
      },
      {
        "id": "1A-b",
        "prompt": "Calculate net sales after deducting a 3.25% merchant processing fee."
      },
      {
        "id": "1A-c",
        "prompt": "If operating expenses totaled $31,200.00, what is the net profit margin as a percentage of gross sales?"
      }
    ],
    "table": {
      "title": "Question 1B — Calculate the total amount due, including 7% sales tax on taxable items only (T = taxable, E = exempt).",
      "headers": [
        "Item",
        "Amount",
        "Tax?",
        "Total"
      ],
      "rows": [
        [
          "Office supplies",
          "$185.40",
          "T"
        ],
        [
          "Professional services – legal retainer",
          "$1,200.00",
          "E"
        ],
        [
          "Software subscription",
          "$49.99",
          "T"
        ],
        [
          "Postage & shipping",
          "$23.75",
          "E"
        ],
        [
          "Tax subtotal (7% on taxable)",
          "",
          ""
        ],
        [
          "TOTAL DUE",
          "",
          ""
        ]
      ],
      "kind": "invoice"
    }
  },
  {
    "title": "Excel Formula Knowledge",
    "questions": [
      {
        "id": "2A-a",
        "prompt": "Sum all values in column B, rows 2 through 50."
      },
      {
        "id": "2A-b",
        "prompt": "Calculate the average of values in C2 through C20."
      },
      {
        "id": "2A-c",
        "prompt": "IF formula: if D5 > 1000, display \"Over Budget\"; otherwise display \"On Track\"."
      },
      {
        "id": "2A-d",
        "prompt": "VLOOKUP: find the value in cell A2 in column A of Sheet2 (range A1:D100) and return column 3."
      },
      {
        "id": "2A-e",
        "prompt": "SUMIF: sum all values in column D where column B equals \"Advertising\"."
      },
      {
        "id": "2B-a",
        "prompt": "Column A = date, B = vendor, C = expense category, D = amount (rows 2–200). Write a formula to total all \"Meals & Entertainment\" expenses."
      },
      {
        "id": "2B-b",
        "prompt": "Write a formula to count the number of \"Meals & Entertainment\" transactions."
      }
    ]
  },
  {
    "title": "Chart of Accounts",
    "questions": [
      {
        "id": "3B",
        "prompt": "Where in a standard QuickBooks chart of accounts would you find \"Owner’s Draw\"? Explain why."
      },
      {
        "id": "3C",
        "prompt": "A client’s transactions include \"Stripe Payouts\", \"Square Deposits\", and \"Client Retainers Received\". How would you categorize each, and what account type applies?"
      }
    ],
    "table": {
      "title": "Question 3A — Classify each account.",
      "headers": [
        "#",
        "Account name",
        "Account type"
      ],
      "rows": [
        [
          "1",
          "Accounts Receivable"
        ],
        [
          "2",
          "Unearned Revenue"
        ],
        [
          "3",
          "Owner’s Draw"
        ],
        [
          "4",
          "Merchant Processing Fees"
        ],
        [
          "5",
          "Prepaid Insurance"
        ],
        [
          "6",
          "Sales Tax Payable"
        ],
        [
          "7",
          "Cost of Goods Sold"
        ],
        [
          "8",
          "Notes Payable – Long Term"
        ],
        [
          "9",
          "Service Revenue"
        ],
        [
          "10",
          "Accumulated Depreciation"
        ],
        [
          "11",
          "Wages Payable"
        ],
        [
          "12",
          "Office Rent Expense"
        ]
      ],
      "kind": "accounts"
    }
  },
  {
    "title": "Debits & Credits",
    "questions": [
      {
        "id": "4B",
        "prompt": "A client pays $2,500 monthly office rent. Identify both accounts affected and state whether each is debited or credited. Explain why."
      },
      {
        "id": "4C",
        "prompt": "A client receives $5,000 from a customer as an advance payment for services not yet rendered. How do you record this? Which accounts are affected and why?"
      }
    ],
    "table": {
      "title": "Question 4A — For each account type, describe the effect of a debit and a credit on the balance.",
      "headers": [
        "Account name",
        "Debit",
        "Credit"
      ],
      "rows": [
        [
          "Asset"
        ],
        [
          "Liability"
        ],
        [
          "Equity / Owner’s Capital"
        ],
        [
          "Revenue"
        ],
        [
          "Expense"
        ]
      ],
      "kind": "debits"
    }
  },
  {
    "title": "Identifying & Correcting Errors",
    "questions": [
      {
        "id": "5A",
        "prompt": "Describe your process for detecting personal expenses recorded as business expenses. What specific red flags do you look for?"
      },
      {
        "id": "5B",
        "prompt": "You find a bank feed transaction labeled only \"Zelle Payment – $450.\" The client is unavailable. Walk through every step you would take to research and classify this transaction."
      },
      {
        "id": "5C",
        "prompt": "Month-end review shows total debits and credits are out of balance by $180. List at least four possible causes and describe how you would systematically locate the error."
      }
    ]
  },
  {
    "title": "Industry-Specific Knowledge",
    "questions": [
      {
        "id": "6A",
        "prompt": "Do you make an effort to understand the specific revenue and expense categories pertinent to a client’s industry? Describe how you approach learning a new industry’s financial structure when onboarding a new client."
      }
    ],
    "table": {
      "title": "Question 6B — Name at least two revenue accounts and two expense accounts for each industry.",
      "headers": [
        "Industry",
        "Key revenue accounts",
        "Key expense accounts"
      ],
      "rows": [
        [
          "Retail / E-commerce"
        ],
        [
          "Professional Services"
        ],
        [
          "Construction"
        ],
        [
          "Hospitality"
        ],
        [
          "Healthcare"
        ]
      ],
      "kind": "industry"
    }
  },
  {
    "title": "Profit & Loss Review",
    "questions": [
      {
        "id": "7B",
        "prompt": "Identify at least three items in this P&L that concern you and explain what action you would take for each."
      },
      {
        "id": "7C",
        "prompt": "Meals & Entertainment of $8,750 represents ~10% of total revenue. What questions would you ask, and what IRS guidelines or limits would you check?"
      },
      {
        "id": "7D",
        "prompt": "Net income is $10,580 but the client says they should have more cash. What are three possible explanations you would investigate?"
      }
    ],
    "table": {
      "title": "Question 7A — Review the sample P&L. Identify anomalies, misclassifications, or items that warrant follow-up.",
      "headers": [
        "Account",
        "Amount"
      ],
      "rows": [
        [
          "Revenue",
          ""
        ],
        [
          "Service Revenue",
          "$84,200.00"
        ],
        [
          "Product Sales",
          "$12,450.00"
        ],
        [
          "Other Income – Personal Loan Repayment",
          "$3,000.00"
        ],
        [
          "TOTAL REVENUE",
          "$99,650.00"
        ],
        [
          "Cost of Goods Sold",
          ""
        ],
        [
          "Inventory Purchased",
          "$18,300.00"
        ],
        [
          "TOTAL COGS",
          "$18,300.00"
        ],
        [
          "GROSS PROFIT",
          "$81,350.00"
        ],
        [
          "Operating Expenses",
          ""
        ],
        [
          "Rent Expense",
          "$24,000.00"
        ],
        [
          "Wages & Salaries",
          "$31,500.00"
        ],
        [
          "Meals & Entertainment",
          "$8,750.00"
        ],
        [
          "Owner’s Personal Groceries",
          "$1,100.00"
        ],
        [
          "Utilities",
          "$1,800.00"
        ],
        [
          "Marketing & Advertising",
          "$3,200.00"
        ],
        [
          "Office Supplies",
          "$420.00"
        ],
        [
          "TOTAL OPERATING EXPENSES",
          "$70,770.00"
        ],
        [
          "NET INCOME",
          "$10,580.00"
        ]
      ],
      "kind": "profit"
    }
  },
  {
    "title": "Bank Reconciliation",
    "questions": [
      {
        "id": "8A",
        "prompt": "Explain in your own words the purpose of a bank reconciliation and how often it should be performed."
      },
      {
        "id": "8C",
        "prompt": "After completing the reconciliation, the adjusted bank balance and adjusted book balance do not agree. List three common reasons and describe how you would resolve each."
      }
    ],
    "table": {
      "title": "Question 8B — Complete the reconciliation. Dummy balances: bank $14,620.50; deposits in transit $2,000; outstanding checks $1,250; books $15,455.50; bank charges $35; interest $10; NSF check $60.",
      "headers": [
        "Bank reconciliation",
        "Amount"
      ],
      "rows": [
        [
          "Bank statement ending balance"
        ],
        [
          "Add: Deposits in transit"
        ],
        [
          "Less: Outstanding checks"
        ],
        [
          "Adjusted bank balance"
        ],
        [
          "Book balance"
        ],
        [
          "Less: Bank service charge"
        ],
        [
          "Add: Interest earned"
        ],
        [
          "Less: NSF check"
        ],
        [
          "Adjusted book balance"
        ]
      ],
      "kind": "bank"
    }
  },
  {
    "title": "Financial Statement Concepts",
    "questions": [
      {
        "id": "9A",
        "prompt": "If a deposit is in transit, does this reduce or increase the book balance? Explain your answer."
      },
      {
        "id": "9B",
        "prompt": "If a cheque payment is uncleared (outstanding), does this reduce or increase the bank balance? Explain your answer."
      },
      {
        "id": "9C",
        "prompt": "If comparing two consecutive months of items, where will this be reflected in the financial statements?"
      }
    ]
  }
];
