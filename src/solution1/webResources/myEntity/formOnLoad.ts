/**
 * Form OnLoad event handler.
 * @param executionContext Execution context.
 */
export async function formOnLoad(executionContext: Xrm.Events.EventContext) {
    const formContext = executionContext.getFormContext()
    formContext.ui.setFormNotification('Hello, World!', 'INFO', 'hello-world')
}