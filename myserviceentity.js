const EventSourced = require("cloudstate").EventSourced;

const entity = new EventSourced(
  [
    "myentity.proto"
  ],
  "com.example.MyServiceEntity",
  {
    persistenceId: "myserviceentity",
    serializeFallbackToJson: true
  }
);


entity.setInitial(entityId => ({}));

entity.setBehavior(state => {
  return {
    commandHandlers: {
      SetValue: setValue,
      GetValue: getValue
    },
    eventHandlers: {
      ValueSet: valueSet
    }
  };
});

function setValue(command, state, ctx) {
  const valueSet = {
    type: "ValueSet",
    value: command.value
  };    
  ctx.emit(valueSet);
  return {};
}

function getValue(command, state, ctx) {
  return state;
}


function valueSet(setValue, state) {
  state.value = setValue.value;
  return state;
}
module.exports = entity;