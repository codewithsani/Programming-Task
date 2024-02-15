let posts = document.getElementById("jsonDataSelect");
let newDefault1 = new Option("Select post", null, true, true);
newDefault1.disabled = true;
posts.add(newDefault1);

// Function to fetch data from JSONPlaceholder
async function fetchData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Function to populate options in the select element
async function populateSelect() {
  const jsonDataSelect = document.getElementById("jsonDataSelect");
  const data = await fetchData();

  // Add options to select element
  data.forEach((item) => {
    const option = document.createElement("option");
    option.textUserId = item.userId;
    option.value = item.id;
    option.textContent = item.title;
    option.textBody = item.body;
    jsonDataSelect.appendChild(option);
  });
}

// Function to display selected option details
function displaySelectedOption() {
  const jsonDataSelect = document.getElementById("jsonDataSelect");
  const selectedOptionDisplay = document.getElementById(
    "selectedOptionDisplay"
  );
  const selectedOptionId = jsonDataSelect.value;

  // Find the selected option details
  const selectedOption = jsonDataSelect.options[jsonDataSelect.selectedIndex];

  // Display selected option details
  selectedOptionDisplay.innerHTML = `
  <h2>Selected Option:</h2>
  <p><strong>UserId</strong>: ${selectedOption.textUserId}</p>
  <p><strong>ID</strong>: ${selectedOption.value}</p>
  <p><strong>Title</strong>: ${selectedOption.textContent}</p>
  <p><strong>Body</strong>: ${selectedOption.textBody}</p>
`;
}

// Function to display  post counts
async function displayPostCounts() {
  const selectedOptionDisplay = document.getElementById("selectedPostCount");

  // Fetch data again to get the post counts
  const data = await fetchData();

  // Count posts for each userId
  const postCounts = {};

  data.forEach((item) => {
    postCounts[item.userId] = (postCounts[item.userId] || 0) + 1;
  });

  // Display post counts in a list
  selectedPostCount.innerHTML += `
  <h3>Post Counts:</h3>
  <ul>
    ${Object.keys(postCounts)
      .map((userId) => `<li>User ${userId}: ${postCounts[userId]} posts</li>`)
      .join("")}
  </ul>
`;
}

// Call the functions
populateSelect();
displayPostCounts();
