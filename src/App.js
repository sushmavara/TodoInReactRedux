import React from 'react';
import AppHeader from './components/AppHeader/AppHeader'
import TodoListsBuilder from './containers/TodoListsBuilder/TodoListsBuilder'

function App() {
  return (
    <div>
      <AppHeader/>
      <TodoListsBuilder/>
    </div>
  );
}

export default App;
