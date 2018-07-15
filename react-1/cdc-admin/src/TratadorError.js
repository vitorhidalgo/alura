import PubSub from 'pubsub-js';

export default class TratadorError
{
    publishError(error)
    {
        for(var i = 0; i < error.errors.length; i++)
        {
            var erro = error.errors[i];
            PubSub.publish('error-validation', erro);
        }
    }
}