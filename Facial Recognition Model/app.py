import streamlit as st
import plotly.graph_objects as go

# Generate dummy data for the Plotly chart
X = [[1, 2], [2, 3], [3, 4], [4, 5], [5, 6]]
Y = ['A', 'B', 'C', 'D', 'E']

def main():
  # Create a Plotly chart showing the links between the accounts
  fig = go.Figure(data=[go.Sankey(
      node = dict(
        pad = 15,
        thickness = 20,
        line = dict(color = "black", width = 0.5),
        label = Y,
        color = "blue"
      ),
      link = dict(
        source = [0, 1, 0, 2, 3],
        target = [2, 3, 3, 4, 4],
        value = [8, 4, 2, 8, 4]
      ))])

  fig.update_layout(title_text="Links between accounts", font_size=10)

  # Display the Plotly chart in the Streamlit website
  st.plotly_chart(fig)

  # Prompt the user to input two bank account numbers
  account_1 = st.text_input("Enter bank account 1:")
  account_2 = st.text_input("Enter bank account 2:")

  # Check the links between the entered accounts
  result = check_links(account_1, account_2)

  # Display the result to the user
  st.write("Links between the entered accounts:", result)

def check_links(account_1, account_2):
  # Dummy function to check the links between two accounts
  return "There are links between these accounts"

if __name__ == "__main__":
  main()
