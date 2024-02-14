import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Dimensions, TouchableOpacity  } from 'react-native';

export default function App() {
  const [todoText, setTodoText] = useState('');
  const [todos, setTodos] = useState([]);
  const [finished, setFinished] = useState([]);

  const addTodo = () => {
    if (todoText.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: todoText }]);
      setTodoText('');
    }
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const markTodoAsDone = (id) => {
    const todoToMove = todos.find(todo => todo.id === id);
    setFinished([...finished, todoToMove]);
    removeTodo(id);
  };

  const removeFinished = (id) => {
    setFinished(finished.filter(todo => todo.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo App</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Todo"
          value={todoText}
          onChangeText={setTodoText}
        />
        <Button title="Add" onPress={addTodo} />
      </View>
      <ScrollView style={styles.listContainer}>
        {todos.map(todo => (
          <View key={todo.id} style={styles.todoItem}>
            <Text>{todo.text}</Text>
            <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={() => markTodoAsDone(todo.id)}>
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => removeTodo(todo.id)}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={{backgroundColor: 'grey', height:12, width: Dimensions.get('window').width}}/>
      <ScrollView style={[styles.listContainer, styles.doneContainer]}>
        {finished.map(todo => (
          <View key={todo.id} style={styles.todoItem}>
            <Text>{todo.text}</Text>
            <View style={styles.buttons}>
              <TouchableOpacity title="Delete" onPress={() => removeFinished(todo.id)} style={styles.button}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  listContainer: {
    flex: 1,
    width: '100%',
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    marginHorizontal: 10,
    backgroundColor: '#5BA8FF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white', // Adjust text color
  },
  doneContainer: {
    marginTop: 10,
  }
});